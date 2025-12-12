import express from "express";
import { planApiController } from "../../di/index.js";

const router = express.Router();

router.get("/", planApiController.getAll);
router.get("/:id", planApiController.getById);
router.post("/", planApiController.create);
router.put("/:id", planApiController.update);
router.delete("/:id", planApiController.delete);

export default router;
