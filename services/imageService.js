import sharp from "sharp";
import path from "path";
import fs from "fs";
import { ApiError } from "../utils/ApiError.js";
import logger from "../utils/logger.js";

export class ImageService {
  constructor() {
    this.supportedFormats = ["jpeg", "jpg", "png", "webp", "avif", "tiff", "gif"];
    this.outputDir = path.join(process.cwd(), "converted");

    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  getSupportedMimeTypes() {
    return ["image/jpeg", "image/png", "image/webp", "image/gif", "image/tiff", "image/avif"];
  }

  isFormatSupported(format) {
    return this.supportedFormats.includes(format.toLowerCase());
  }

  async convertImage(inputBuffer, targetFormat) {
    try {
      const format = targetFormat.toLowerCase();

      if (!this.isFormatSupported(format)) {
        throw new ApiError(
          `Format nesuportat: ${targetFormat}. Formate acceptate: ${this.supportedFormats.join(", ")}`,
          400,
          "UNSUPPORTED_FORMAT"
        );
      }

      logger.info(`Conversie imagine către ${format}`);

      let sharpInstance = sharp(inputBuffer);

      switch (format) {
        case "jpeg":
        case "jpg":
          sharpInstance = sharpInstance.jpeg({
            quality: 95,
            progressive: true,
          });
          break;

        case "png":
          sharpInstance = sharpInstance.png({
            quality: 95,
            compressionLevel: 6,
          });
          break;

        case "webp":
          sharpInstance = sharpInstance.webp({
            quality: 95,
            lossless: false,
          });
          break;

        case "avif":
          sharpInstance = sharpInstance.avif({
            quality: 95,
          });
          break;

        case "tiff":
          sharpInstance = sharpInstance.tiff({
            quality: 95,
          });
          break;

        case "gif":
          sharpInstance = sharpInstance.gif();
          break;

        default:
          sharpInstance = sharpInstance.toFormat(format);
      }

      const outputBuffer = await sharpInstance.toBuffer();

      logger.info(`Conversie reușită: ${inputBuffer.length} bytes → ${outputBuffer.length} bytes (${format})`);

      return outputBuffer;
    } catch (error) {
      logger.error(`Eroare conversie imagine: ${error.message}`);

      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(`Eroare la conversia imaginii: ${error.message}`, 500, "CONVERSION_FAILED");
    }
  }

  async saveImageToDisk(buffer, filename) {
    try {
      const filepath = path.join(this.outputDir, filename);
      await fs.promises.writeFile(filepath, buffer);
      logger.info(`Imagine salvată: ${filepath}`);
      return filepath;
    } catch (error) {
      logger.error(`Eroare salvare imagine: ${error.message}`);
      throw new ApiError(`Eroare la salvarea imaginii: ${error.message}`, 500, "SAVE_FAILED");
    }
  }
}
