import { ApiError } from "../../utils/ApiError.js";
import logger from "../../utils/logger.js";

export class ImageController {
  constructor(imageService, usageService) {
    this.imageService = imageService;
    this.usageService = usageService;
  }

  convertImage = async (req, res, next) => {
    try {
      const { userId, targetFormat } = req.body;
      const imageBuffer = req.file?.buffer;

      if (!imageBuffer) {
        throw new ApiError("Niciun fișier încărcat", 400, "NO_FILE");
      }

      if (!targetFormat) {
        throw new ApiError("Format țintă lipsă", 400, "MISSING_FORMAT");
      }

      if (!userId) {
        throw new ApiError("User ID lipsă", 400, "MISSING_USER_ID");
      }

      const sharp = (await import("sharp")).default;
      const metadata = await sharp(imageBuffer).metadata();
      const inputFormat = metadata.format.toUpperCase();
      const outputFormat = targetFormat.toUpperCase();
      const conversionType = `${inputFormat}_TO_${outputFormat}`;

      const fileSize = imageBuffer.length;
      await this.usageService.createUsage(parseInt(userId), conversionType, fileSize);

      const convertedBuffer = await this.imageService.convertImage(imageBuffer, targetFormat);

      const filename = `converted_${Date.now()}.${targetFormat}`;
      res.set({
        "Content-Type": `image/${targetFormat}`,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": convertedBuffer.length,
      });

      logger.info(`Conversie reușită pentru userId: ${userId}`);
      res.send(convertedBuffer);
    } catch (error) {
      next(error);
    }
  };

  getSupportedFormats = async (req, res, next) => {
    try {
      res.json({
        success: true,
        formats: this.imageService.supportedFormats,
      });
    } catch (error) {
      next(error);
    }
  };
}
