import sequelize from "./src/config/DataBase.js";
import { Task } from "./src/models/Task.model.js";
import { User } from "./src/models/user.model.js";
sequelize
  .authenticate()
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.error("DB connection error:", err));
sequelize
  .sync({ alter: true })
  .then(() => console.log("kolchi hoa hadal"))
  .catch((err) => console.log("3ndk errer", err));
