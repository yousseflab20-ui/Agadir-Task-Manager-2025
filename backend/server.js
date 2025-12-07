import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import authRoutes from "./src/routes/authRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";

const app = express();
app.use(express.json());

const swaggerDocument = YAML.load("./docs/openapi.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger UI running on http://localhost:${PORT}/api-docs`);
});
