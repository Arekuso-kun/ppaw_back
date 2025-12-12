export class UsageAccessor {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async getAllUsage() {
    return await this.prisma.usage.findMany({
      orderBy: { usageid: "asc" },
    });
  }

  async getAllUsageDetailed() {
    return await this.prisma.usage.findMany({
      include: { users: true },
      orderBy: { usageid: "asc" },
    });
  }

  async getUsageById(usageId) {
    return await this.prisma.usage.findUnique({
      where: { usageid: usageId },
      include: { users: true },
    });
  }

  async countUsage({ userid, dateRange, status }) {
    return this.prisma.usage.count({
      where: {
        userid,
        status,
        date: {
          gte: dateRange.gte,
          lte: dateRange.lte,
        },
      },
    });
  }

  async createUsage(usageData) {
    return await this.prisma.usage.create({ data: usageData });
  }

  async updateUsage(usageId, usageData) {
    return await this.prisma.usage.update({
      where: { usageid: usageId },
      data: usageData,
    });
  }

  async deleteUsage(usageId) {
    return await this.prisma.usage.delete({
      where: { usageid: usageId },
    });
  }
}
