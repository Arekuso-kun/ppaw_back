import { PlansAccessor } from "../accessors/PlansAccessor.js";

export class PlansController {
  static async index(req, res) {
    try {
      const plans = await PlansAccessor.getAllPlans();
      res.render("plans/index", { plans });
    } catch (error) {
      console.error("Error fetching plans:", error);
      res.status(500).send("Error loading plans");
    }
  }

  static async details(req, res) {
    try {
      const id = Number(req.params.id);
      const plan = await PlansAccessor.getPlanById(id);
      if (!plan) return res.status(404).send("Plan not found");
      res.render("plans/details", { plan });
    } catch (error) {
      console.error("Error fetching plan details:", error);
      res.status(500).send("Error loading plan details");
    }
  }

  static async createGet(req, res) {
    res.render("plans/create");
  }

  static async createPost(req, res) {
    try {
      const { planname, maxconversionsperday, maxfilesize } = req.body;
      await PlansAccessor.createPlan({
        planname,
        maxconversionsperday: Number(maxconversionsperday),
        maxfilesize: Number(maxfilesize),
      });
      res.redirect("/plans");
    } catch (error) {
      console.error("Error creating plan:", error);
      res.status(500).send("Error saving plan");
    }
  }

  static async editGet(req, res) {
    try {
      const id = Number(req.params.id);
      const plan = await PlansAccessor.getPlanById(id);
      if (!plan) return res.status(404).send("Plan not found");
      res.render("plans/edit", { plan });
    } catch (error) {
      console.error("Error loading plan for edit:", error);
      res.status(500).send("Error loading edit form");
    }
  }

  static async editPost(req, res) {
    try {
      const id = Number(req.params.id);
      const { planname, maxconversionsperday, maxfilesize } = req.body;
      await PlansAccessor.updatePlan(id, {
        planname,
        maxconversionsperday: Number(maxconversionsperday),
        maxfilesize: Number(maxfilesize),
      });
      res.redirect("/plans");
    } catch (error) {
      console.error("Error updating plan:", error);
      res.status(500).send("Error saving changes");
    }
  }
}
