import { ApiError } from "../utils/ApiError.js";
import { withCache, invalidateCache } from "../utils/cache.js";

export class UsageService {
  constructor(usageAccessor, userService) {
    this.usageAccessor = usageAccessor;
    this.userService = userService;
  }

  getAllUsage = async () => {
    try {
      return await withCache("usage", "all_usage", () => this.usageAccessor.getAllUsage());
    } catch {
      throw new ApiError("Eroare la încărcarea utilizărilor");
    }
  };

  getAllUsageDetailed = async () => {
    try {
      return await withCache("usage", "all_usage_detailed", () => this.usageAccessor.getAllUsageDetailed());
    } catch {
      throw new ApiError("Eroare la încărcarea detaliilor utilizărilor");
    }
  };

  getUsageById = async (id) => {
    const usage = await withCache("usage", `usage_${id}`, () => this.usageAccessor.getUsageById(id));
    if (!usage) throw new ApiError("Nu a fost găsit logul de utilizare", 404);
    return usage;
  };

  createUsage = async (userId, conversionType, fileSize) => {
    const check = await this.userService.canConvert(userId, fileSize);

    if (!check.canConvert) {
      let message = "Ai atins limita zilnică de conversii.";
      let errorCode = "DAILY_LIMIT_EXCEEDED";
      if (check.fileTooLarge) {
        message = `Fișier prea mare. Limita planului tău este ${check.maxFileSizeBytes / (1024 * 1024)} MB.`;
        errorCode = "FILE_SIZE_EXCEEDED";
      }
      throw new ApiError(message, 400, errorCode);
    }

    return this.logConversion(userId, conversionType, "success", fileSize);
  };

  logConversion = async (userId, conversionType, status, fileSize) => {
    const usage = await this.usageAccessor.createUsage({
      userid: userId,
      conversiontype: conversionType,
      status,
      filesize: fileSize,
    });
    invalidateCache("usage");
    return usage;
  };

  updateUsage = async (id, data) => {
    const usage = await this.usageAccessor.updateUsage(id, data);
    invalidateCache("usage");
    return usage;
  };

  deleteUsage = async (id) => {
    try {
      await this.usageAccessor.deleteUsage(id);
      invalidateCache("usage");
    } catch {
      throw new ApiError("Eroare la ștergerea logului de utilizare", 400);
    }
  };
}
