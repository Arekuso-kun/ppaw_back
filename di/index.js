import { PrismaClient } from "@prisma/client";

import { UserAccessor } from "../accessors/userAccessor.js";
import { UsageAccessor } from "../accessors/usageAccessor.js";
import { PlanAccessor } from "../accessors/planAccessor.js";

import { UserService } from "../services/userService.js";
import { UsageService } from "../services/usageService.js";
import { PlanService } from "../services/planService.js";

import { UserApiController } from "../controllers/api/userController.js";
import { UsageApiController } from "../controllers/api/usageController.js";
import { PlanApiController } from "../controllers/api/planController.js";

import { UserController } from "../controllers/userController.js";
import { UsageController } from "../controllers/usageController.js";
import { PlanController } from "../controllers/planController.js";

const prisma = new PrismaClient();

const userAccessor = new UserAccessor(prisma);
const usageAccessor = new UsageAccessor(prisma);
const planAccessor = new PlanAccessor(prisma);

const usersService = new UserService(userAccessor, usageAccessor);
const usageService = new UsageService(usageAccessor, usersService);
const planService = new PlanService(planAccessor);

const userApiController = new UserApiController(usersService);
const usageApiController = new UsageApiController(usageService);
const planApiController = new PlanApiController(planService);

const userController = new UserController(userAccessor, planAccessor);
const usageController = new UsageController(usageAccessor, userAccessor);
const planController = new PlanController(planAccessor);

export { userApiController, usageApiController, planApiController, userController, usageController, planController };
