import pool from "../config/db.js";
import crypto from "crypto";

// ✅ Create transaction + block
export const createTransaction = async (req, res) => {
  const { sender_id, receiver_id, amount } = req.body;

  try {
    // Get sender & receiver wallets
      const senderWallet = await pool.query(
        "SELECT * FROM wallets WHERE user_id = $1 ORDER BY wallet_id DESC LIMIT 1",
        [sender_id]
      );

      const receiverWallet = await pool.query(
      "SELECT * FROM wallets WHERE user_id = $1",
      [receiver_id]
    );

    if (!senderWallet.rows[0]) return res.status(400).json({ message: "Sender wallet not found" });
    if (!receiverWallet.rows[0]) return res.status(400).json({ message: "Receiver wallet not found" });

    const sender_wallet_id = senderWallet.rows[0].wallet_id;
    const receiver_wallet_id = receiverWallet.rows[0].wallet_id;

    if (senderWallet.rows[0].balance < amount)
      return res.status(400).json({ message: "Insufficient balance" });

    // Update balances
    await pool.query("UPDATE wallets SET balance = balance - $1 WHERE wallet_id = $2", [
      amount,
      sender_wallet_id,
    ]);
    await pool.query("UPDATE wallets SET balance = balance + $1 WHERE wallet_id = $2", [
      amount,
      receiver_wallet_id,
    ]);

    // Add transaction record
    const transactionRes = await pool.query(
      "INSERT INTO transactions (sender_wallet_id, receiver_wallet_id, amount) VALUES ($1, $2, $3) RETURNING *",
      [sender_wallet_id, receiver_wallet_id, amount]
    );

    const transaction = transactionRes.rows[0];

    // ✅ Create Block Automatically
    const lastBlock = await pool.query("SELECT block_hash FROM blocks ORDER BY block_id DESC LIMIT 1");
    const previousHash = lastBlock.rows[0]?.block_hash || "GENESIS";

    const blockData = `${sender_wallet_id}-${receiver_wallet_id}-${amount}-${Date.now()}`;
    const newHash = crypto.createHash("sha256").update(blockData + previousHash).digest("hex");

    await pool.query(
      "INSERT INTO blocks (block_hash, previous_hash) VALUES ($1, $2)",
      [newHash, previousHash]
    );

    res.status(201).json({ message: "Transaction & Block created", transaction });
  } catch (err) {
    console.error("❌ Transaction failed:", err.message);
    res.status(500).json({ message: "Transaction failed", error: err.message });
  }
};

// ✅ Get transactions by user_id (mapped to wallet)
export const getTransactions = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const walletRes = await pool.query("SELECT wallet_id FROM wallets WHERE user_id = $1", [user_id]);
    if (!walletRes.rows[0]) return res.status(404).json({ message: "Wallet not found" });

    const wallet_id = walletRes.rows[0].wallet_id;

    const result = await pool.query(
      "SELECT * FROM transactions WHERE sender_wallet_id = $1 OR receiver_wallet_id = $1 ORDER BY transaction_id DESC",
      [wallet_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Fetch transactions error:", err.message);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};
// ✅ Get all transactions (for admin/home page)
export const getAllTransactions = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM transactions ORDER BY transaction_id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Fetch all transactions error:", err.message);
    res.status(500).json({ message: "Failed to fetch all transactions" });
  }
};

