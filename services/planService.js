import { ApiError } from "../utils/ApiError.js";

export class PlanService {
  constructor(planAccessor) {
    this.planAccessor = planAccessor;
  }

  getAllPlans = async () => {
    try {
      return await this.planAccessor.getAllPlans();
    } catch (err) {
      throw new ApiError("Eroare la încărcarea planurilor");
    }
  };

  getAllPlansWithUsers = async () => {
    try {
      return await this.planAccessor.getAllPlansWithUsers();
    } catch (err) {
      throw new ApiError("Eroare la încărcarea planurilor cu utilizatori");
    }
  };

  getPlanById = async (planId) => {
    const plan = await this.planAccessor.getPlanById(planId);
    if (!plan) throw new ApiError("Planul nu a fost găsit", 404);
    return plan;
  };

  createPlan = async (planData) => {
    return this.planAccessor.createPlan({
      ...planData,
      maxconversionsperday: Number(planData.maxconversionsperday),
      maxfilesize: Number(planData.maxfilesize),
    });
  };

  updatePlan = async (planId, planData) => {
    return this.planAccessor.updatePlan(planId, {
      ...planData,
      maxconversionsperday: Number(planData.maxconversionsperday),
      maxfilesize: Number(planData.maxfilesize),
    });
  };

  deletePlan = async (planId) => {
    try {
      await this.planAccessor.deletePlan(planId);
    } catch {
      throw new ApiError("Nu se poate șterge planul. Poate fi folosit de utilizatori.", 400);
    }
  };
}
