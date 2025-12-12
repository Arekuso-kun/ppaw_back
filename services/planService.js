import { ApiError } from "../utils/ApiError.js";
import { withCache, invalidateCache } from "../utils/cache.js";

export class PlanService {
  constructor(planAccessor) {
    this.planAccessor = planAccessor;
  }

  getAllPlans = async () => {
    try {
      return await withCache("plan", "all_plans", () => this.planAccessor.getAllPlans());
    } catch (err) {
      throw new ApiError("Eroare la încărcarea planurilor");
    }
  };

  getAllPlansWithUsers = async () => {
    try {
      return await withCache("plan", "all_plans_with_users", () => this.planAccessor.getAllPlansWithUsers());
    } catch (err) {
      throw new ApiError("Eroare la încărcarea planurilor cu utilizatori");
    }
  };

  getPlanById = async (planId) => {
    const plan = await withCache("plan", `plan_${planId}`, () => this.planAccessor.getPlanById(planId));
    if (!plan) throw new ApiError("Planul nu a fost găsit", 404);
    return plan;
  };

  createPlan = async (planData) => {
    const plan = await this.planAccessor.createPlan({
      ...planData,
      maxconversionsperday: Number(planData.maxconversionsperday),
      maxfilesize: Number(planData.maxfilesize),
    });
    invalidateCache("plan");
    return plan;
  };

  updatePlan = async (planId, planData) => {
    const plan = await this.planAccessor.updatePlan(planId, {
      ...planData,
      maxconversionsperday: Number(planData.maxconversionsperday),
      maxfilesize: Number(planData.maxfilesize),
    });
    invalidateCache("plan");
    return plan;
  };

  deletePlan = async (planId) => {
    try {
      await this.planAccessor.deletePlan(planId);
      invalidateCache("plan");
    } catch {
      throw new ApiError("Nu se poate șterge planul. Poate fi folosit de utilizatori.", 400);
    }
  };
}
