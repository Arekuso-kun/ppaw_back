export class PlansAccessor {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async getAllPlans() {
    return await this.prisma.plans.findMany();
  }

  async getAllPlansWithUsers() {
    return await this.prisma.plans.findMany({
      include: { users: true },
    });
  }

  async getPlanById(planId) {
    return await this.prisma.plans.findUnique({
      where: { planid: planId },
    });
  }

  async createPlan(planData) {
    return await this.prisma.plans.create({
      data: planData,
    });
  }

  async updatePlan(planId, planData) {
    return await this.prisma.plans.update({
      where: { planid: planId },
      data: planData,
    });
  }

  async deletePlan(planId) {
    return await this.prisma.plans.delete({
      where: { planid: planId },
    });
  }
}
