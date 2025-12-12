import express from "express";
import { usersApiController } from "../../di/index.js";

const router = express.Router();

router.get("/", usersApiController.getAll);
router.get("/detailed", usersApiController.getAllDetailed);
router.get("/:id", usersApiController.getById);
router.get("/:id/conversions", usersApiController.checkDailyConversions);
router.post("/", usersApiController.create);
router.post("/login", usersApiController.login);
router.put("/:id", usersApiController.update);
router.delete("/:id", usersApiController.delete);

export default router;
