import express from "express";
import { userController } from "../di/index.js";

const router = express.Router();

router.get("/", userController.index);
router.get("/:id", userController.details);
router.get("/create/new", userController.createGet);
router.post("/create/new", userController.createPost);
router.get("/edit/:id", userController.editGet);
router.post("/edit/:id", userController.editPost);

export default router;
