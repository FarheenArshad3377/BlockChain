import express from "express";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// 🔹 Verify token middleware
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

router.post("/", async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) return res.status(400).json({ message: "User ID required" });

    // ✅ Check if wallet already exists
    const existing = await pool.query(
      "SELECT * FROM wallets WHERE user_id = $1",
      [user_id]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Wallet already exists" });
    }

    const wallet_address = `WALLET-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const result = await pool.query(
      "INSERT INTO wallets (user_id, balance, wallet_address) VALUES ($1, $2, $3) RETURNING *",
      [user_id, 100, wallet_address]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Wallet creation failed", error: err.message });
  }
});

// ✅ Get all wallets
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM wallets ORDER BY wallet_id ASC");
    res.json({ wallets: result.rows });
  } catch (err) {
    console.error("Fetch wallets error:", err.message);
    res.status(500).json({ message: "Failed to fetch wallets" });
  }
});

// ✅ Get wallet of logged-in user
router.get("/me", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query("SELECT * FROM wallets WHERE user_id = $1", [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch wallet", error: err.message });
  }
});

export default router;

