import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
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

app.get("/", (req, res) => res.send("Hello Pookie 🚀"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/block", blockRoutes);
app.use("/api", transactionRoutes);
const PORT = process.env.PORT || 5030;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

