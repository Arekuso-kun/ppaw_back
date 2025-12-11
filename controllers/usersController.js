import { UsersAccessor } from "../accessors/UsersAccessor.js";
import { PlansAccessor } from "../accessors/PlansAccessor.js";

export class UsersController {
  static async index(req, res) {
    try {
      const users = await UsersAccessor.getAllUsersDetailed();
      res.render("users/index", { users });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Error loading users");
    }
  }

  static async details(req, res) {
    try {
      const id = Number(req.params.id);
      const user = await UsersAccessor.getUserById(id);
      if (!user) return res.status(404).send("User not found");
      res.render("users/details", { user });
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).send("Error loading user details");
    }
  }

  static async createGet(req, res) {
    try {
      const plans = await PlansAccessor.getAllPlans();
      res.render("users/create", { plans });
    } catch (error) {
      console.error("Error loading create user form:", error);
      res.status(500).send("Error loading create form");
    }
  }

  static async createPost(req, res) {
    try {
      const { name, email, password, planid } = req.body;
      await UsersAccessor.createUser({
        name,
        email,
        password,
        planid: Number(planid),
      });
      res.redirect("/users");
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Error saving user");
    }
  }

  static async editGet(req, res) {
    try {
      const id = Number(req.params.id);
      const user = await UsersAccessor.getUserById(id);
      const plans = await PlansAccessor.getAllPlans();
      if (!user) return res.status(404).send("User not found");
      res.render("users/edit", { user, plans });
    } catch (error) {
      console.error("Error loading user for edit:", error);
      res.status(500).send("Error loading edit form");
    }
  }

  static async editPost(req, res) {
    try {
      const id = Number(req.params.id);
      const { name, email, planid } = req.body;
      await UsersAccessor.updateUser(id, {
        name,
        email,
        planid: Number(planid),
      });
      res.redirect("/users");
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send("Error saving changes");
    }
  }
}
