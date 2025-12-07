import sequelize from "./src/config/DataBase.js";
import Task from "./src/models/TaskModel.js";
import User from "./src/models/userModel.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
const app = express();
app.use(express.json());
app.use("/api", taskRoutes);
app.use("/auth", authRoutes);
const PORT = process.env.PORT || 2000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
    await sequelize.sync({ alter: true });
    console.log("✅ Tables synced successfully");
  } catch (err) {
    console.log("❌ Database connection error:", err);
  }

  // 🔹 دابا PORT معرف، يمكن نستعملو
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
