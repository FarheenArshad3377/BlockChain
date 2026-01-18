import pool from "../config/db.js"; // ✅ correct import name

export const createWalletController = async (req, res) => {
  try {
    const { user_id, wallet_address } = req.body;
    if (!user_id) return res.status(400).json({ message: "User ID is required" });

    const result = await pool.query(
      "INSERT INTO wallets (user_id, balance, wallet_address) VALUES ($1, $2, $3) RETURNING *",
      [user_id, 100, wallet_address || `WALLET-${Date.now()}`]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Wallet creation failed", error: err.message });
  }
};
// ✅ Get all wallets
export const getWalletsController = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM wallets ORDER BY wallet_id ASC");
    res.json({ wallets: result.rows });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch wallets", error: error.message });
  }
};

// ✅ Get wallet of currently logged-in user
export const getWalletByUser = async (req, res) => {
  try {
    const userId = req.user.id; // JWT middleware se aayega

    const wallet = await pool.query("SELECT * FROM wallets WHERE user_id = $1", [userId]);

    if (wallet.rows.length === 0) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    res.json(wallet.rows[0]);
  } catch (error) {
    console.error("Wallet fetch error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

