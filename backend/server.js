const sequelize = require("./src/config/DataBase");
sequelize
  .authenticate()
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.error("DB connection error:", err));
sequelize.sync();
