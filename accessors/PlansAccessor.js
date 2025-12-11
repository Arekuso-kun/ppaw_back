import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class PlansAccessor {
  static async getAllPlans() {
    return await prisma.plans.findMany();
  }

  static async getAllPlansWithUsers() {
    return await prisma.plans.findMany({
      include: { users: true },
    });
  }

  static async getPlanById(planId) {
    return await prisma.plans.findUnique({
      where: { planid: planId },
    });
  }

  static async createPlan(planData) {
    return await prisma.plans.create({
      data: planData,
    });
  }

  static async updatePlan(planId, planData) {
    return await prisma.plans.update({
      where: { planid: planId },
      data: planData,
    });
  }

  static async deletePlan(planId) {
    return await prisma.plans.delete({
      where: { planid: planId },
    });
  }
}
