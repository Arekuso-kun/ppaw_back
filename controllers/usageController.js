import { UsageAccessor } from "../accessors/UsageAccessor.js";
import { UsersAccessor } from "../accessors/UsersAccessor.js";

export class UsageController {
  static async index(req, res) {
    try {
      const usages = await UsageAccessor.getAllUsageDetailed();
      res.render("usage/index", { usages });
    } catch (error) {
      console.error("Error fetching usage data:", error);
      res.status(500).send("Error loading usage data");
    }
  }

  static async createGet(req, res) {
    try {
      const users = await UsersAccessor.getAllUsers();
      res.render("usage/create", { users });
    } catch (error) {
      console.error("Error loading create usage form:", error);
      res.status(500).send("Error loading create form");
    }
  }

  static async createPost(req, res) {
    try {
      const { userid, conversionFrom, conversionTo, status, filesize } = req.body;

      const combinedConversionType = `${conversionFrom}_TO_${conversionTo}`;

      await UsageAccessor.createUsage({
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
  }
}
