import pool from "../config/db.js";

export const addChainController = async (req, res) => {
  try {
    const blocks = await pool.query("SELECT * FROM Blocks ORDER BY block_id ASC");
    res.json({ chain: blocks.rows });
  } catch (err) {
    res.status(500).json({ message: "Fetching chain failed", error: err.message });
  }
};
