import express from "express";
import { UsersController } from "../controllers/usersController.js";

const router = express.Router();

router.get("/", UsersController.index);
router.get("/:id", UsersController.details);
router.get("/create/new", UsersController.createGet);
router.post("/create/new", UsersController.createPost);
router.get("/edit/:id", UsersController.editGet);
router.post("/edit/:id", UsersController.editPost);

export default router;
