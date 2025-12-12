export class UsageApiController {
  constructor(usageService) {
    this.usageService = usageService;
  }

  getAll = async (req, res, next) => {
    const usages = await this.usageService.getAllUsage();
    res.json(usages);
  };

  getAllDetailed = async (req, res, next) => {
    const usages = await this.usageService.getAllUsageDetailed();
    res.json(usages);
  };

  getById = async (req, res, next) => {
    const id = Number(req.params.id);
    const usage = await this.usageService.getUsageById(id);
    res.json(usage);
  };

  create = async (req, res, next) => {
    const { userid, conversiontype, filesize } = req.body;
    const usage = await this.usageService.createUsage(userid, conversiontype, filesize);
    res.status(201).json(usage);
  };

  update = async (req, res, next) => {
    const id = Number(req.params.id);
    const { userid, conversiontype, status, filesize } = req.body;
    const updatedUsage = await this.usageService.updateUsage(id, {
      userid: Number(userid),
      conversiontype,
      status,
      filesize: Number(filesize),
    });
    res.json(updatedUsage);
  };

  delete = async (req, res, next) => {
    const id = Number(req.params.id);
    await this.usageService.deleteUsage(id);
    res.status(204).send();
  };
}
