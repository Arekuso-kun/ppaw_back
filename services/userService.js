export class UserService {
  constructor(usersAccessor, usageAccessor) {
    this.usersAccessor = usersAccessor;
    this.usageAccessor = usageAccessor;
  }

  getAllUsers() {
    return this.usersAccessor.getAllUsers();
  }

  getAllUsersDetailed() {
    return this.usersAccessor.getAllUsersDetailed();
  }

  getUserById(id) {
    return this.usersAccessor.getUserById(id);
  }

  getUserByEmail(email) {
    return this.usersAccessor.getUserByEmail(email);
  }

  createUser(userData) {
    return this.usersAccessor.createUser(userData);
  }

  updateUser(id, userData) {
    return this.usersAccessor.updateUser(id, userData);
  }

  deleteUser(id) {
    return this.usersAccessor.deleteUser(id);
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
    const user = await this.usersAccessor.getUserById(userId);
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

  async canConvert(userId, fileSizeBytes) {
    const info = await this.getUserConversionInfo(userId);
    if (!info) throw new Error("User not found");

    const maxFileSizeBytes = info.maxFileSize * 1024 * 1024;

    return {
      canConvert: info.canConvert && fileSizeBytes <= maxFileSizeBytes,
      remainingConversions: info.remainingConversions,
      maxFileSizeBytes,
      fileTooLarge: fileSizeBytes > maxFileSizeBytes,
    };
  }
}
