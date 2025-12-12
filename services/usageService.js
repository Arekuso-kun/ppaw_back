export class UsageService {
  constructor(usageAccessor, usersService) {
    this.usageAccessor = usageAccessor;
    this.usersService = usersService;
  }

  getAllUsage() {
    return this.usageAccessor.getAllUsage();
  }

  getAllUsageDetailed() {
    return this.usageAccessor.getAllUsageDetailed();
  }

  getUsageById(id) {
    return this.usageAccessor.getUsageById(id);
  }

  updateUsage(id, data) {
    return this.usageAccessor.updateUsage(id, data);
  }

  deleteUsage(id) {
    return this.usageAccessor.deleteUsage(id);
  }

  async logConversion(userId, conversionType, status, fileSize) {
    return this.usageAccessor.createUsage({
      userid: userId,
      conversiontype: conversionType,
      status,
      filesize: fileSize,
    });
  }

  async createUsage(userId, conversionType, fileSize) {
    const check = await this.usersService.canConvert(userId, fileSize);

    if (!check.canConvert) {
      let message = "Ai atins limita zilnică de conversii.";
      if (check.fileTooLarge) {
        message = `Fișier prea mare. Limita planului tău este ${check.maxFileSizeBytes / (1024 * 1024)} MB.`;
      }
      throw new Error(message);
    }

    return this.logConversion(userId, conversionType, "success", fileSize);
  }
}
