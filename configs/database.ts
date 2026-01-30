import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mysql",
  }
);

sequelize.authenticate()
  .then(() => {
    console.log("Connect Database Successful!");
  })
  .catch((error) => {
    console.error("Connect Database Fail:", error);
  });

export default sequelize;
