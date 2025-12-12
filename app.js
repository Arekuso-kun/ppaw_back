import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import planRoutes from "./routes/planRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import usageRoutes from "./routes/usageRoutes.js";

import planApiRoutes from "./routes/api/planRoutes.js";
import userApiRoutes from "./routes/api/userRoutes.js";
import usageApiRoutes from "./routes/api/usageRoutes.js";

import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/requestLogger.js";

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

app.use(requestLogger);

app.use("/plans", planRoutes);
app.use("/users", userRoutes);
app.use("/usage", usageRoutes);

app.use("/api/v1/plans", planApiRoutes);
app.use("/api/v1/users", userApiRoutes);
app.use("/api/v1/usage", usageApiRoutes);

app.use(errorHandler);

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
