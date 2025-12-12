export class PlanApiController {
  constructor(planService) {
    this.planService = planService;
  }

  getAll = async (req, res, next) => {
    const plans = await this.planService.getAllPlans();
    res.json(plans);
  };

  getById = async (req, res, next) => {
    const id = Number(req.params.id);
    const plan = await this.planService.getPlanById(id);
    res.json(plan);
  };

  create = async (req, res, next) => {
    const newPlan = await this.planService.createPlan(req.body);
    res.status(201).json(newPlan);
  };

  update = async (req, res, next) => {
    const id = Number(req.params.id);
    const updatedPlan = await this.planService.updatePlan(id, req.body);
    res.json(updatedPlan);
  };

  delete = async (req, res, next) => {
    const id = Number(req.params.id);
    await this.planService.deletePlan(id);
    res.status(204).send();
  };
}
