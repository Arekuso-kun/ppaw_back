import express from "express";
import { PlansApiController } from "../../controllers/api/plansApiController.js";

const router = express.Router();

router.get("/", PlansApiController.getAll);
router.get("/:id", PlansApiController.getById);
router.post("/", PlansApiController.create);
router.put("/:id", PlansApiController.update);
router.delete("/:id", PlansApiController.delete);

export default router;
