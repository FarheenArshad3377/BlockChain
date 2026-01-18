import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js"; // ✅ PostgreSQL connection
import { createUser, findUserByEmail } from "../models/authmodel.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const newUser = await createUser(name, email, hashed);

    // generate unique wallet address
    const generatedWalletAddress = `WALLET-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // // create wallet for user
       const wallet = await db.query(
      "INSERT INTO wallets (wallet_address, balance, user_id) VALUES ($1, $2, $3) RETURNING *",
      [generatedWalletAddress, 100, newUser.id] // balance = 100
    );

    const token = jwt.sign({ id: newUser.id }, "secret", { expiresIn: "1h" });

    res.json({
      message: "User and wallet created successfully!",
      user: newUser,
      wallet: wallet.rows[0],
      token,
    });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ error: "Register failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Find user
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ error: "User not found" });

    // ✅ Verify password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    // ✅ Create token
    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });

    // ✅ Fetch wallet of logged-in user (wallet_id column)
    const wallet = await db.query(
      "SELECT wallet_id, user_id, balance FROM wallets WHERE user_id = $1",
      [user.id]
    );

    res.json({
      message: "Login successful!",
      user,
      wallet: wallet.rows[0],
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};

