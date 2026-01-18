import pool from "../config/db.js";

export const addToChain = async (block_id) => {
  const result = await pool.query(
    "INSERT INTO chain (block_id) VALUES ($1) RETURNING *",
    [block_id]
  );
  return result.rows[0];
};
