import express from "express";
import { plansApiController } from "../../di/index.js";

const router = express.Router();

router.get("/", plansApiController.getAll);
router.get("/:id", plansApiController.getById);
router.post("/", plansApiController.create);
router.put("/:id", plansApiController.update);
router.delete("/:id", plansApiController.delete);
export default router;
