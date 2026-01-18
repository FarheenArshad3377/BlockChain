import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/authmodel.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, hashed);

    // Generate token
    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });

    // Send both user and token
    res.status(201).json({ user, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Register failed" });
  }
};
