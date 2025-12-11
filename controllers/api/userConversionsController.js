export class UserConversionsController {
  constructor(userService) {
    this.userService = userService;
  }

  async checkDailyConversions(req, res) {
    try {
      const userId = Number(req.params.id);
      const result = await this.userService.canUserConvert(userId);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message || "Something went wrong" });
    }
  }
}
