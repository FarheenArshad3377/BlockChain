import express from "express";
import { createTransaction, getAllTransactions, getTransactions } from "../controller/transactionController.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", createTransaction);
router.get("/user/:user_id", getTransactions);
// ✅ new route for all transactions
router.get("/transactions", getAllTransactions);
// ✅ Copy verifyToken from wallet.js or import it from utils if you saved separately
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, "secret");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// ✅ Your transfer route
router.post("/transfer", verifyToken, async (req, res) => {
  try {
    const { receiverWalletId, amount } = req.body;
    const senderId = req.user.id;

    const senderResult = await pool.query("SELECT * FROM wallets WHERE user_id = $1", [senderId]);
    const senderWallet = senderResult.rows[0];

    if (!senderWallet) return res.status(404).json({ message: "Sender wallet not found" });
    if (senderWallet.balance < amount) return res.status(400).json({ message: "Insufficient balance ❌" });

    const receiverResult = await pool.query("SELECT * FROM wallets WHERE wallet_id = $1", [receiverWalletId]);
    const receiverWallet = receiverResult.rows[0];

    if (!receiverWallet) return res.status(404).json({ message: "Receiver wallet not found" });

    const newSenderBalance = senderWallet.balance - amount;
    const newReceiverBalance = receiverWallet.balance + amount;

    await pool.query("UPDATE wallets SET balance = $1 WHERE user_id = $2", [newSenderBalance, senderId]);
    await pool.query("UPDATE wallets SET balance = $1 WHERE wallet_id = $2", [newReceiverBalance, receiverWalletId]);

    res.json({
      message: "Transfer successful ✅",
      newSenderBalance,
      newReceiverBalance,
    });
  } catch (err) {
    console.error("Transfer error:", err.message);
    res.status(500).json({ message: "Transaction failed", error: err.message });
  }
});
router.get("/transactions-summary/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const sentResult = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) AS total_sent FROM transactions WHERE sender_id = $1",
      [userId]
    );
    const receivedResult = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) AS total_received FROM transactions WHERE receiver_id = $1",
      [userId]
    );

    res.json({
      totalSent: sentResult.rows[0].total_sent,
      totalReceived: receivedResult.rows[0].total_received,
    });
  } catch (err) {
    console.error("Transaction summary error:", err.message);
    res.status(500).json({ message: "Failed to fetch summary" });
  }
});

export default router;

