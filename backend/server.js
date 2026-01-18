import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";

import authRoutes from "./routing/authentication.js";
import walletRoutes from "./routing/wallet.js";
import transactionRoutes from "./routing/transaction.js";
import blockRoutes from "./routing/block.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// DB connect
connectDB();

// Handle ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve React frontend
app.use(express.static(path.join(__dirname, "../frontend/blockchain/build")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/block", blockRoutes);

// Catch-all to serve React frontend for non-API routes
app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) return res.status(404).send({ message: "API route not found" });
  res.sendFile(path.join(__dirname, "../frontend/blockchain/build", "index.html"));
});

const PORT = process.env.PORT || 5030;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
