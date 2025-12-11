export class UserService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async getDailyUsageCount(userId) {
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);

    return this.prisma.usage.count({
      where: {
        userid: userId,
        date: { gte: startOfDay, lte: endOfDay },
        status: "success",
      },
    });
  }

  async canUserConvert(userId) {
    const user = await this.prisma.users.findUnique({
      where: { userid: userId },
      include: { plans: true },
    });

    if (!user) throw new Error("User not found");
    if (!user.plans) throw new Error("User plan not found");

    const dailyUsage = await this.getDailyUsageCount(userId);
    const remainingConversions = user.plans.maxconversionsperday - dailyUsage;

    return {
      canConvert: remainingConversions > 0,
      remainingConversions,
      dailyUsage,
      maxConversions: user.plans.maxconversionsperday,
      maxFileSize: user.plans.maxfilesize,
    };
  }
}
