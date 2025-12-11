import express from "express";
import { UsageController } from "../controllers/usageController.js";

const router = express.Router();

router.get("/", UsageController.index);
router.get("/create/new", UsageController.createGet);
router.post("/create/new", UsageController.createPost);

export default router;
