import express from "express";
import { UsersApiController } from "../../controllers/api/usersApiController.js";

const router = express.Router();

router.get("/", UsersApiController.getAll);
router.get("/detailed", UsersApiController.getAllDetailed);
router.get("/:id", UsersApiController.getById);
router.post("/", UsersApiController.create);
router.post("/login", UsersApiController.login);
router.put("/:id", UsersApiController.update);
router.delete("/:id", UsersApiController.delete);

export default router;
