import express from "express";
import { usageController } from "../di/index.js";

const router = express.Router();

router.get("/", usageController.index);
router.get("/create/new", usageController.createGet);
router.post("/create/new", usageController.createPost);

export default router;
