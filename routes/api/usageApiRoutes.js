import express from "express";
import { usageApiController } from "../../di/index.js";

const router = express.Router();

router.get("/", usageApiController.getAll);
router.get("/detailed", usageApiController.getAllDetailed);
router.get("/:id", usageApiController.getById);
router.post("/", usageApiController.create);
router.put("/:id", usageApiController.update);
router.delete("/:id", usageApiController.delete);
export default router;
