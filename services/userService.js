export class UserService {
  constructor(userAccessor, usageAccessor) {
    this.userAccessor = userAccessor;
    this.usageAccessor = usageAccessor;
  }

  getAllUsers() {
    return this.userAccessor.getAllUsers();
  }

  getAllUsersDetailed() {
    return this.userAccessor.getAllUsersDetailed();
  }

  getUserById(id) {
    return this.userAccessor.getUserById(id);
  }

  getUserByEmail(email) {
    return this.userAccessor.getUserByEmail(email);
  }

  createUser(userData) {
    return this.userAccessor.createUser(userData);
  }

  updateUser(id, userData) {
    return this.userAccessor.updateUser(id, userData);
  }

  deleteUser(id) {
    return this.userAccessor.deleteUser(id);
  }

  async login(email, password) {
    const user = await this.getUserByEmail(email);
    if (!user || user.password !== password) return null;

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getDailyUsageCount(userId) {
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);

    return this.usageAccessor.countUsage({
      userid: userId,
      dateRange: { gte: startOfDay, lte: endOfDay },
      status: "success",
    });
  }

  async getUserConversionInfo(userId) {
    const user = await this.userAccessor.getUserById(userId);
    if (!user) throw new Error("User not found");
    if (!user.plans) throw new Error("User plan not found");

    const dailyUsage = await this.getDailyUsageCount(userId);

    return {
      dailyUsage,
      remainingConversions: user.plans.maxconversionsperday - dailyUsage,
      maxConversions: user.plans.maxconversionsperday,
      maxFileSize: user.plans.maxfilesize,
    };
  }

  async canConvert(userId, fileSizeBytes) {
    const info = await this.getUserConversionInfo(userId);

    const maxFileSizeBytes = info.maxFileSize * 1024 * 1024;

    return {
      canConvert: info.remainingConversions > 0 && fileSizeBytes <= maxFileSizeBytes,
      remainingConversions: info.remainingConversions,
      maxFileSizeBytes,
      fileTooLarge: fileSizeBytes > maxFileSizeBytes,
    };
  }
}
