import { ApiError } from "../utils/ApiError.js";

export class UsageService {
  constructor(usageAccessor, userService) {
    this.usageAccessor = usageAccessor;
    this.userService = userService;
  }

  getAllUsage = async () => {
    try {
      return await this.usageAccessor.getAllUsage();
    } catch {
      throw new ApiError("Eroare la încărcarea utilizărilor");
    }
  };

  getAllUsageDetailed = async () => {
    try {
      return await this.usageAccessor.getAllUsageDetailed();
    } catch {
      throw new ApiError("Eroare la încărcarea detaliilor utilizărilor");
    }
  };

  getUsageById = async (id) => {
    const usage = await this.usageAccessor.getUsageById(id);
    if (!usage) throw new ApiError("Nu a fost găsit logul de utilizare", 404);
    return usage;
  };

  createUsage = async (userId, conversionType, fileSize) => {
    const check = await this.userService.canConvert(userId, fileSize);

    if (!check.canConvert) {
      let message = "Ai atins limita zilnică de conversii.";
      if (check.fileTooLarge) {
        message = `Fișier prea mare. Limita planului tău este ${check.maxFileSizeBytes / (1024 * 1024)} MB.`;
      }
      throw new ApiError(message, 400);
    }

    return this.logConversion(userId, conversionType, "success", fileSize);
  };

  logConversion = async (userId, conversionType, status, fileSize) => {
    return this.usageAccessor.createUsage({
      userid: userId,
      conversiontype: conversionType,
      status,
      filesize: fileSize,
    });
  };

  updateUsage = async (id, data) => {
    return this.usageAccessor.updateUsage(id, data);
  };

  deleteUsage = async (id) => {
    try {
      await this.usageAccessor.deleteUsage(id);
    } catch {
      throw new ApiError("Eroare la ștergerea logului de utilizare", 400);
    }
  };
}
