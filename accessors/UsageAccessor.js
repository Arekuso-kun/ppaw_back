import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class UsageAccessor {
  static async getAllUsage() {
    return await prisma.usage.findMany();
  }

  static async getAllUsageDetailed() {
    return await prisma.usage.findMany({
      include: { users: true },
    });
  }

  static async getUsageById(usageId) {
    return await prisma.usage.findUnique({
      where: { usageid: usageId },
      include: { users: true },
    });
  }

  static async createUsage(usageData) {
    return await prisma.usage.create({ data: usageData });
  }

  static async updateUsage(usageId, usageData) {
    return await prisma.usage.update({
      where: { usageid: usageId },
      data: usageData,
    });
  }

  static async deleteUsage(usageId) {
    return await prisma.usage.delete({
      where: { usageid: usageId },
    });
  }
}
