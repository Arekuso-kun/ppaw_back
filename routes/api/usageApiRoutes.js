import express from "express";
import { UsageApiController } from "../../controllers/api/usageApiController.js";

const router = express.Router();

router.get("/", UsageApiController.getAll);
router.get("/detailed", UsageApiController.getAllDetailed);
router.get("/:id", UsageApiController.getById);
router.post("/", UsageApiController.create);
router.put("/:id", UsageApiController.update);
router.delete("/:id", UsageApiController.delete);

export default router;
