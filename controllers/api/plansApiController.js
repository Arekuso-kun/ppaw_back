import { PlansAccessor } from "../../accessors/PlansAccessor.js";

export class PlansApiController {
  static async getAll(req, res) {
    try {
      const plans = await PlansAccessor.getAllPlans();
      res.json(plans);
    } catch (error) {
      console.error("Error fetching plans:", error);
      res.status(500).json({ error: "Error loading plans" });
    }
  }

  static async getById(req, res) {
    try {
      const id = Number(req.params.id);
      const plan = await PlansAccessor.getPlanById(id);
      if (!plan) {
        return res.status(404).json({ error: "Plan not found" });
      }
      res.json(plan);
    } catch (error) {
      console.error("Error fetching plan details:", error);
      res.status(500).json({ error: "Error loading plan details" });
    }
  }

  static async create(req, res) {
    try {
      const { planname, maxconversionsperday, maxfilesize } = req.body;

      const newPlan = await PlansAccessor.createPlan({
        planname,
        maxconversionsperday: Number(maxconversionsperday),
        maxfilesize: Number(maxfilesize),
      });

      res.status(201).json(newPlan);
    } catch (error) {
      console.error("Error creating plan:", error);
      res.status(500).json({ error: "Error saving plan" });
    }
  }

  static async update(req, res) {
    try {
      const id = Number(req.params.id);
      const { planname, maxconversionsperday, maxfilesize } = req.body;

      const updatedPlan = await PlansAccessor.updatePlan(id, {
        planname,
        maxconversionsperday: Number(maxconversionsperday),
        maxfilesize: Number(maxfilesize),
      });

      res.json(updatedPlan);
    } catch (error) {
      console.error("Error updating plan:", error);
      res.status(500).json({ error: "Error saving changes" });
    }
  }

  static async delete(req, res) {
    try {
      const id = Number(req.params.id);
      await PlansAccessor.deletePlan(id);

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting plan:", error);
      res.status(400).json({ error: "Cannot delete plan. It may be in use." });
    }
  }
}
