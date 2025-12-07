import { Sequelize } from "sequelize";
dotenv.config();
import dotenv from "dotenv";
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "postgres",
    logging: console.log,
  }
);
export default sequelize;
