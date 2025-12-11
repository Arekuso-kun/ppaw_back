import { UsersAccessor } from "../../accessors/UsersAccessor.js";

export class UsersApiController {
  static async getAll(req, res) {
    try {
      const users = await UsersAccessor.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Error loading users" });
    }
  }

  static async getAllDetailed(req, res) {
    try {
      const users = await UsersAccessor.getAllUsersDetailed();
      res.json(users);
    } catch (error) {
      console.error("Error fetching detailed users:", error);
      res.status(500).json({ error: "Error loading detailed users" });
    }
  }

  static async getById(req, res) {
    try {
      const id = Number(req.params.id);
      const user = await UsersAccessor.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ error: "Error loading user details" });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await UsersAccessor.getUserByEmail(email);

      if (!user) {
        return res.status(401).json({ error: "Email sau parolă incorectă." });
      }

      if (user.password !== password) {
        return res.status(401).json({ error: "Email sau parolă incorectă." });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Eroare la autentificare" });
    }
  }

  static async create(req, res) {
    try {
      const { name, email, password, planid } = req.body;

      const userData = { name, email, password };

      if (planid !== undefined) {
        userData.planid = Number(planid);
      }

      const newUser = await UsersAccessor.createUser(userData);

      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);

      if (error.code === "P2002") {
        return res.status(409).json({
          error: "An account with this email already exists.",
        });
      }

      res.status(500).json({ error: "Error saving user" });
    }
  }

  static async update(req, res) {
    try {
      const id = Number(req.params.id);
      const { name, email, planid } = req.body;

      const updatedUser = await UsersAccessor.updateUser(id, {
        name,
        email,
        planid: Number(planid),
      });

      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Error saving changes" });
    }
  }

  static async delete(req, res) {
    try {
      const id = Number(req.params.id);
      await UsersAccessor.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting user:", error);
      if (error.code === "P2003" || error.message.includes("foreign key constraint")) {
        res.status(400).json({ error: "Cannot delete user. They have existing usage logs." });
      } else {
        res.status(500).json({ error: "Error deleting user" });
      }
    }
  }
}
