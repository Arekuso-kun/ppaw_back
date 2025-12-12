export class PlanController {
  constructor(planAccessor) {
    this.planAccessor = planAccessor;
  }

  index = async (req, res) => {
    try {
      const plans = await this.planAccessor.getAllPlans();
      res.render("plans/index", { plans });
    } catch (error) {
      console.error("Error fetching plans:", error);
      res.status(500).send("Error loading plans");
    }
  };

  details = async (req, res) => {
    try {
      const id = Number(req.params.id);
      const plan = await this.planAccessor.getPlanById(id);
      if (!plan) return res.status(404).send("Plan not found");
      res.render("plans/details", { plan });
    } catch (error) {
      console.error("Error fetching plan details:", error);
      res.status(500).send("Error loading plan details");
    }
  };

  createGet = (req, res) => {
    res.render("plans/create");
  };

  createPost = async (req, res) => {
    try {
      const { planname, maxconversionsperday, maxfilesize } = req.body;
      await this.planAccessor.createPlan({
        planname,
        maxconversionsperday: Number(maxconversionsperday),
        maxfilesize: Number(maxfilesize),
      });
      res.redirect("/plans");
    } catch (error) {
      console.error("Error creating plan:", error);
      res.status(500).send("Error saving plan");
    }
  };

  editGet = async (req, res) => {
    try {
      const id = Number(req.params.id);
      const plan = await this.planAccessor.getPlanById(id);
      if (!plan) return res.status(404).send("Plan not found");
      res.render("plans/edit", { plan });
    } catch (error) {
      console.error("Error loading plan for edit:", error);
      res.status(500).send("Error loading edit form");
    }
  };

  editPost = async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { planname, maxconversionsperday, maxfilesize } = req.body;
      await this.planAccessor.updatePlan(id, {
        planname,
        maxconversionsperday: Number(maxconversionsperday),
        maxfilesize: Number(maxfilesize),
      });
      res.redirect("/plans");
    } catch (error) {
      console.error("Error updating plan:", error);
      res.status(500).send("Error saving changes");
    }
  };

  deletePost = async (req, res) => {
    try {
      const id = Number(req.params.id);
      await this.planAccessor.deletePlan(id);
      res.redirect("/plans");
    } catch (error) {
      console.error("Error deleting plan:", error);
      res.status(500).send("Error deleting plan");
    }
  };
}
