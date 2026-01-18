import  pool  from "../config/db.js";

// ✅ Get all blocks
export const getBlocks = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT block_id, block_hash, previous_hash, timestamp FROM blocks ORDER BY block_id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Fetch blocks error:", err.message);
    res.status(500).json({ message: "Failed to fetch blocks" });
  }
};

