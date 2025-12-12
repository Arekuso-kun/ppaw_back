export class UsersApiController {
  constructor(userService) {
    this.userService = userService;
  }

  getAll = async (req, res) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Error loading users" });
    }
  };

  getAllDetailed = async (req, res) => {
    try {
      const users = await this.userService.getAllUsersDetailed();
      res.json(users);
    } catch (error) {
      console.error("Error fetching detailed users:", error);
      res.status(500).json({ error: "Error loading detailed users" });
    }
  };

  getById = async (req, res) => {
    try {
      const id = Number(req.params.id);
      const user = await this.userService.getUserById(id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ error: "Error loading user details" });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.login(email, password);
      if (!user) return res.status(401).json({ error: "Email sau parolă incorectă." });
      res.json(user);
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Eroare la autentificare" });
    }
  };

  create = async (req, res) => {
    try {
      const { name, email, password, planid } = req.body;
      const userData = { name, email, password };
      if (planid !== undefined) userData.planid = Number(planid);

      const newUser = await this.userService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.code === "P2002") {
        return res.status(409).json({ error: "An account with this email already exists." });
      }
      res.status(500).json({ error: "Error saving user" });
    }
  };

  update = async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { name, email, planid } = req.body;
      const updatedUser = await this.userService.updateUser(id, {
        name,
        email,
        planid: Number(planid),
      });
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Error saving changes" });
    }
  };

  delete = async (req, res) => {
    try {
      const id = Number(req.params.id);
      await this.userService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting user:", error);
      if (error.code === "P2003" || error.message.includes("foreign key constraint")) {
        res.status(400).json({ error: "Cannot delete user. They have existing usage logs." });
      } else {
        res.status(500).json({ error: "Error deleting user" });
      }
    }
  };

  checkDailyConversions = async (req, res) => {
    try {
      const userId = Number(req.params.id);
      const result = await this.userService.getUserConversionInfo(userId);
      res.json(result);
    } catch (err) {
      if (err.message === "User not found") return res.status(404).json({ error: err.message });
      res.status(500).json({ error: err.message || "Something went wrong" });
    }
  };
}
