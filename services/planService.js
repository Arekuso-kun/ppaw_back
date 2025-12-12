export class PlanService {
  constructor(plansAccessor) {
    this.plansAccessor = plansAccessor;
  }

  getAllPlans() {
    return this.plansAccessor.getAllPlans();
  }

  getAllPlansWithUsers() {
    return this.plansAccessor.getAllPlansWithUsers();
  }

  getPlanById(planId) {
    return this.plansAccessor.getPlanById(planId);
  }

  createPlan(planData) {
    // Ensure numeric values
    return this.plansAccessor.createPlan({
      ...planData,
      maxconversionsperday: Number(planData.maxconversionsperday),
      maxfilesize: Number(planData.maxfilesize),
    });
  }

  updatePlan(planId, planData) {
    return this.plansAccessor.updatePlan(planId, {
      ...planData,
      maxconversionsperday: Number(planData.maxconversionsperday),
      maxfilesize: Number(planData.maxfilesize),
    });
  }

  deletePlan(planId) {
    return this.plansAccessor.deletePlan(planId);
  }
}
