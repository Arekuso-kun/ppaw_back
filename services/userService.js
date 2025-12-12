import { ApiError } from "../utils/ApiError.js";

export class UserService {
  constructor(userAccessor, usageAccessor) {
    this.userAccessor = userAccessor;
    this.usageAccessor = usageAccessor;
  }

  getAllUsers = async () => {
    return this.userAccessor.getAllUsers();
  };

  getAllUsersDetailed = async () => {
    return this.userAccessor.getAllUsersDetailed();
  };

  getUserById = async (id) => {
    const user = await this.userAccessor.getUserById(id);
    if (!user) throw new ApiError("Utilizatorul nu a fost găsit", 404);
    return user;
  };

  getUserByEmail = async (email) => {
    return this.userAccessor.getUserByEmail(email);
  };

  createUser = async (userData) => {
    return this.userAccessor.createUser(userData);
  };

  updateUser = async (id, userData) => {
    return this.userAccessor.updateUser(id, userData);
  };

  deleteUser = async (id) => {
    return this.userAccessor.deleteUser(id);
  };

  login = async (email, password) => {
    const user = await this.getUserByEmail(email);
    if (!user || user.password !== password) {
      throw new ApiError("Email sau parolă incorectă", 401);
    }
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  };

  getDailyUsageCount = async (userId) => {
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);

    return this.usageAccessor.countUsage({
      userid: userId,
      dateRange: { gte: startOfDay, lte: endOfDay },
      status: "success",
    });
  };

  getUserConversionInfo = async (userId) => {
    const user = await this.getUserById(userId);
    if (!user.plans) throw new ApiError("Planul utilizatorului nu a fost găsit", 404);

    const dailyUsage = await this.getDailyUsageCount(userId);

    return {
      dailyUsage,
      remainingConversions: user.plans.maxconversionsperday - dailyUsage,
      maxConversions: user.plans.maxconversionsperday,
      maxFileSize: user.plans.maxfilesize,
    };
  };

  canConvert = async (userId, fileSizeBytes) => {
    const info = await this.getUserConversionInfo(userId);
    const maxFileSizeBytes = info.maxFileSize * 1024 * 1024;

    return {
      canConvert: info.remainingConversions > 0 && fileSizeBytes <= maxFileSizeBytes,
      remainingConversions: info.remainingConversions,
      maxFileSizeBytes,
      fileTooLarge: fileSizeBytes > maxFileSizeBytes,
    };
  };
}
