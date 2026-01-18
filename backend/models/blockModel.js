import pool from "../config/db.js";

export const createBlock = async (hash, prev_hash) => {
  const result = await pool.query(
    "INSERT INTO blocks (hash, prev_hash) VALUES ($1, $2) RETURNING *",
    [hash, prev_hash]
  );
  return result.rows[0];
};
