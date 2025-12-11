import express from "express";
import { PlansController } from "../controllers/plansController.js";

const router = express.Router();

router.get("/", PlansController.index);
router.get("/:id", PlansController.details);
router.get("/create/new", PlansController.createGet);
router.post("/create/new", PlansController.createPost);
router.get("/edit/:id", PlansController.editGet);
router.post("/edit/:id", PlansController.editPost);

export default router;
