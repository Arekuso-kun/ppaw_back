import { UsageAccessor } from "../../accessors/UsageAccessor.js";

export class UsageApiController {
  static async getAll(req, res) {
    try {
      const usages = await UsageAccessor.getAllUsage();
      res.json(usages);
    } catch (error) {
      console.error("Error fetching usage:", error);
      res.status(500).json({ error: "Error loading usage" });
    }
  }

  static async getAllDetailed(req, res) {
    try {
      const usages = await UsageAccessor.getAllUsageDetailed();
      res.json(usages);
    } catch (error) {
      console.error("Error fetching detailed usage:", error);
      res.status(500).json({ error: "Error loading detailed usage" });
    }
  }

  static async getById(req, res) {
    try {
      const id = Number(req.params.id);
      const usage = await UsageAccessor.getUsageById(id);
      if (!usage) {
        return res.status(404).json({ error: "Usage log not found" });
      }
      res.json(usage);
    } catch (error) {
      console.error("Error fetching usage details:", error);
      res.status(500).json({ error: "Error loading usage details" });
    }
  }

  static async create(req, res) {
    try {
      const { userid, conversiontype, status, filesize } = req.body;

      const newUsage = await UsageAccessor.createUsage({
        userid: Number(userid),
        conversiontype,
        status,
        filesize: Number(filesize),
      });

      res.status(201).json(newUsage);
    } catch (error) {
      console.error("Error creating usage log:", error);
      res.status(500).json({ error: "Error saving usage log" });
    }
  }

  static async update(req, res) {
    try {
      const id = Number(req.params.id);
      const { userid, conversiontype, status, filesize } = req.body;

      const updatedUsage = await UsageAccessor.updateUsage(id, {
        userid: Number(userid),
        conversiontype,
        status,
        filesize: Number(filesize),
      });

      res.json(updatedUsage);
    } catch (error) {
      console.error("Error updating usage log:", error);
      res.status(500).json({ error: "Error saving changes" });
    }
  }

  static async delete(req, res) {
    try {
      const id = Number(req.params.id);
      await UsageAccessor.deleteUsage(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting usage log:", error);
      res.status(500).json({ error: "Error deleting usage log" });
    }
  }
}
