import express from "express";
import { userApiController } from "../../di/index.js";

const router = express.Router();

router.get("/", userApiController.getAll);
router.get("/detailed", userApiController.getAllDetailed);
router.get("/:id", userApiController.getById);
router.get("/:id/conversions", userApiController.checkDailyConversions);
router.post("/", userApiController.create);
router.post("/login", userApiController.login);
router.put("/:id", userApiController.update);
router.delete("/:id", userApiController.delete);

export default router;
