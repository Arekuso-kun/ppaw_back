import express from "express";
import { PrismaClient } from "@prisma/client";
import { UserService } from "../../services/userService.js";
import { UserConversionsController } from "../../controllers/api/userConversionsController.js";

const router = express.Router();
const prisma = new PrismaClient();
const userService = new UserService(prisma);
const userConversionsController = new UserConversionsController(userService);

router.get("/:id/conversions", (req, res) => userConversionsController.checkDailyConversions(req, res));

export default router;
