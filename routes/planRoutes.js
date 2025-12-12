import express from "express";
import { planController } from "../di/index.js";

const router = express.Router();

router.get("/", planController.index);
router.get("/:id", planController.details);
router.get("/create/new", planController.createGet);
router.post("/create/new", planController.createPost);
router.get("/edit/:id", planController.editGet);
router.post("/edit/:id", planController.editPost);

export default router;
