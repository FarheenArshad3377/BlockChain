import express from "express";
import { createWalletController } from "../controller/walletController.js";

const router = express.Router();

// Create wallet
router.post("/", createWalletController);

// Get all wallets
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM wallets");
    res.json({ wallets: result.rows });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch wallets", error: err.message });
  }
});

export default router;
