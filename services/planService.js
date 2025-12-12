export class PlanService {
  constructor(planAccessor) {
    this.planAccessor = planAccessor;
  }

  getAllPlans() {
    return this.planAccessor.getAllPlans();
  }

  getAllPlansWithUsers() {
    return this.planAccessor.getAllPlansWithUsers();
  }

  getPlanById(planId) {
    return this.planAccessor.getPlanById(planId);
  }

  createPlan(planData) {
    // Ensure numeric values
    return this.planAccessor.createPlan({
      ...planData,
      maxconversionsperday: Number(planData.maxconversionsperday),
      maxfilesize: Number(planData.maxfilesize),
    });
  }

  updatePlan(planId, planData) {
    return this.planAccessor.updatePlan(planId, {
      ...planData,
      maxconversionsperday: Number(planData.maxconversionsperday),
      maxfilesize: Number(planData.maxfilesize),
    });
  }

  deletePlan(planId) {
    return this.planAccessor.deletePlan(planId);
  }
}
