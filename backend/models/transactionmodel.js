import pool from "../config/db.js";

export const createTransaction = async (from_wallet, to_wallet, amount) => {
  const result = await pool.query(
    "INSERT INTO transactions (from_wallet, to_wallet, amount) VALUES ($1, $2, $3) RETURNING *",
    [from_wallet, to_wallet, amount]
  );
  return result.rows[0];
};
