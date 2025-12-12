export class PlanApiController {
  constructor(planService) {
    this.planService = planService;
  }

  getAll = async (req, res) => {
    try {
      const plans = await this.planService.getAllPlans();
      res.json(plans);
    } catch (error) {
      console.error("Error fetching plans:", error);
      res.status(500).json({ error: "Error loading plans" });
    }
  };

  getById = async (req, res) => {
    try {
      const id = Number(req.params.id);
      const plan = await this.planService.getPlanById(id);
      if (!plan) return res.status(404).json({ error: "Plan not found" });
      res.json(plan);
    } catch (error) {
      console.error("Error fetching plan details:", error);
      res.status(500).json({ error: "Error loading plan details" });
    }
  };

  create = async (req, res) => {
    try {
      const newPlan = await this.planService.createPlan(req.body);
      res.status(201).json(newPlan);
    } catch (error) {
      console.error("Error creating plan:", error);
      res.status(500).json({ error: "Error saving plan" });
    }
  };

  update = async (req, res) => {
    try {
      const id = Number(req.params.id);
      const updatedPlan = await this.planService.updatePlan(id, req.body);
      res.json(updatedPlan);
    } catch (error) {
      console.error("Error updating plan:", error);
      res.status(500).json({ error: "Error saving changes" });
    }
  };

  delete = async (req, res) => {
    try {
      const id = Number(req.params.id);
      await this.planService.deletePlan(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting plan:", error);
      res.status(400).json({ error: "Cannot delete plan. It may be in use." });
    }
  };
}
