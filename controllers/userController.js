export class UserController {
  constructor(userAccessor, planAccessor) {
    this.userAccessor = userAccessor;
    this.planAccessor = planAccessor;
  }

  index = async (req, res) => {
    try {
      const users = await this.userAccessor.getAllUsersDetailed();
      res.render("users/index", { users });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Error loading users");
    }
  };

  details = async (req, res) => {
    try {
      const id = Number(req.params.id);
      const user = await this.userAccessor.getUserById(id);
      if (!user) return res.status(404).send("User not found");
      res.render("users/details", { user });
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).send("Error loading user details");
    }
  };

  createGet = async (req, res) => {
    try {
      const plans = await this.planAccessor.getAllPlans();
      res.render("users/create", { plans });
    } catch (error) {
      console.error("Error loading create user form:", error);
      res.status(500).send("Error loading create form");
    }
  };

  createPost = async (req, res) => {
    try {
      const { name, email, password, planid } = req.body;
      await this.userAccessor.createUser({
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
  };

  editGet = async (req, res) => {
    try {
      const id = Number(req.params.id);
      const user = await this.userAccessor.getUserById(id);
      const plans = await this.planAccessor.getAllPlans();
      if (!user) return res.status(404).send("User not found");
      res.render("users/edit", { user, plans });
    } catch (error) {
      console.error("Error loading user for edit:", error);
      res.status(500).send("Error loading edit form");
    }
  };

  editPost = async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { name, email, planid } = req.body;
      await this.userAccessor.updateUser(id, {
        name,
        email,
        planid: Number(planid),
      });
      res.redirect("/users");
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send("Error saving changes");
    }
  };
}
