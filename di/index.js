import { PrismaClient } from "@prisma/client";
import { UsersAccessor } from "../accessors/UsersAccessor.js";
import { UsageAccessor } from "../accessors/UsageAccessor.js";
import { PlansAccessor } from "../accessors/PlansAccessor.js";
import { UserService } from "../services/userService.js";
import { UsageService } from "../services/usageService.js";
import { PlanService } from "../services/planService.js";
import { UsersApiController } from "../controllers/api/usersApiController.js";
import { UsageApiController } from "../controllers/api/usageApiController.js";
import { PlansApiController } from "../controllers/api/plansApiController.js";

const prisma = new PrismaClient();

const usersAccessor = new UsersAccessor(prisma);
const usageAccessor = new UsageAccessor(prisma);
const plansAccessor = new PlansAccessor(prisma);

const usersService = new UserService(usersAccessor, usageAccessor);
const usageService = new UsageService(usageAccessor, usersService);
const planService = new PlanService(plansAccessor);

const usersApiController = new UsersApiController(usersService);
const usageApiController = new UsageApiController(usageService);
const plansApiController = new PlansApiController(planService);

export { usersApiController, usageApiController, plansApiController };
