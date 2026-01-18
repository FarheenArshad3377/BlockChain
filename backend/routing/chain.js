import express from "express";
import { addChainController } from "../controller/chainController.js";

const router = express.Router();

// Add block to chain
router.post("/add", addChainController);

export default router;
