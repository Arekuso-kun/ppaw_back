import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import plansRoutes from "./routes/plansRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import usageRoutes from "./routes/usageRoutes.js";

import plansApiRoutes from "./routes/api/plansApiRoutes.js";
import usersApiRoutes from "./routes/api/usersApiRoutes.js";
import usageApiRoutes from "./routes/api/usageApiRoutes.js";
import userConversionsRoutes from "./routes/api/userConversionsRoutes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/plans", plansRoutes);
app.use("/users", usersRoutes);
app.use("/usage", usageRoutes);

app.use("/api/v1/plans", plansApiRoutes);
app.use("/api/v1/users", usersApiRoutes);
app.use("/api/v1/users", userConversionsRoutes);
app.use("/api/v1/usage", usageApiRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  console.log("MVC endpoints:");
  console.log("Plans: http://localhost:3000/plans");
  console.log("Users: http://localhost:3000/users");
  console.log("Usage: http://localhost:3000/usage");
  console.log("API v1 endpoints:");
  console.log("Plans: http://localhost:3000/api/v1/plans");
  console.log("Users: http://localhost:3000/api/v1/users");
  console.log("Usage: http://localhost:3000/api/v1/usage");
});
