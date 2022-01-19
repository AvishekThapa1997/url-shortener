import { Sequelize } from "sequelize";
import dotnev from "dotenv";
dotnev.config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    define: {
      freezeTableName: true,
      timestamps: false,
    },
    logging: false,
  }
);
export default sequelize;
