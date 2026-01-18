import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Project",
  password: "123",
  port: 5432,
});
export const connectDB = async () => {
  try {
    await pool.connect();
    console.log("✅ PostgreSQL Connected");
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
    process.exit(1);
  }
};

export default pool;

