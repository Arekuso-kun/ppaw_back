import { ImageService } from "../services/imageService.js";

export class UsageController {
  constructor(usageAccessor, userAccessor) {
    this.usageAccessor = usageAccessor;
    this.userAccessor = userAccessor;
    this.imageService = new ImageService();
  }

  index = async (req, res) => {
    try {
      const usages = await this.usageAccessor.getAllUsageDetailed();
      res.render("usage/index", { usages });
    } catch (error) {
      console.error("Error fetching usage data:", error);
      res.status(500).send("Error loading usage data");
    }
  };

  createGet = async (req, res) => {
    try {
      const users = await this.userAccessor.getAllUsers();
      const imageFormats = this.imageService.supportedFormats.map((f) => f.toUpperCase());
      res.render("usage/create", { users, imageFormats });
    } catch (error) {
      console.error("Error loading create usage form:", error);
      res.status(500).send("Error loading create form");
    }
  };

  createPost = async (req, res) => {
    try {
      const { userid, conversionFrom, conversionTo, status, filesize } = req.body;

      const combinedConversionType = `${conversionFrom}_TO_${conversionTo}`;

      await this.usageAccessor.createUsage({
        userid: Number(userid),
        conversiontype: combinedConversionType,
        status,
        filesize: Number(filesize),
      });

      res.redirect("/usage");
    } catch (error) {
      console.error("Error logging usage:", error);
      res.status(500).send("Error saving usage log");
    }
  };
}
