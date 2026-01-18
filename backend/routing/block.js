import express from "express";
import { getBlocks } from "../controller/blockController.js";

const router = express.Router();
router.get("/", getBlocks);

export default router;
