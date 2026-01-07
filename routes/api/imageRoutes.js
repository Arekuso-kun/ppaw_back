import express from "express";
import multer from "multer";
import { imageApiController } from "../../di/index.js";
import { ImageService } from "../../services/imageService.js";

const router = express.Router();

const tempImageService = new ImageService();
const allowedMimes = tempImageService.getSupportedMimeTypes();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max
  },
  fileFilter: (req, file, cb) => {
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Tip de fișier nesuportat. Formate acceptate: ${allowedMimes.join(", ")}`));
    }
  },
});

router.post("/convert", upload.single("image"), imageApiController.convertImage);
router.get("/formats", imageApiController.getSupportedFormats);

export default router;
