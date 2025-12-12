export class UsageApiController {
  constructor(usageService) {
    this.usageService = usageService;
  }

  getAll = async (req, res) => {
    try {
      const usages = await this.usageService.getAllUsage();
      res.json(usages);
    } catch (error) {
      console.error("Error fetching usage:", error);
      res.status(500).json({ error: "Error loading usage" });
    }
  };

  getAllDetailed = async (req, res) => {
    try {
      const usages = await this.usageService.getAllUsageDetailed();
      res.json(usages);
    } catch (error) {
      console.error("Error fetching detailed usage:", error);
      res.status(500).json({ error: "Error loading detailed usage" });
    }
  };

  getById = async (req, res) => {
    try {
      const id = Number(req.params.id);
      const usage = await this.usageService.getUsageById(id);
      if (!usage) return res.status(404).json({ error: "Usage log not found" });
      res.json(usage);
    } catch (error) {
      console.error("Error fetching usage details:", error);
      res.status(500).json({ error: "Error loading usage details" });
    }
  };

  create = async (req, res) => {
    try {
      const { userid, conversiontype, filesize } = req.body;
      const usage = await this.usageService.createUsage(userid, conversiontype, filesize);
      res.status(201).json(usage);
    } catch (error) {
      console.error("Error creating usage log:", error);
      res.status(500).json({ error: error.message || "Error saving usage log" });
    }
  };

  update = async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { userid, conversiontype, status, filesize } = req.body;
      const updatedUsage = await this.usageService.updateUsage(id, {
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
  };

  delete = async (req, res) => {
    try {
      const id = Number(req.params.id);
      await this.usageService.deleteUsage(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting usage log:", error);
      res.status(500).json({ error: "Error deleting usage log" });
    }
  };
}
