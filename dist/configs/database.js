"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelize = new sequelize_1.Sequelize(process.env.DATABASE_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mysql",
});
sequelize.authenticate()
    .then(function () {
    console.log("Connect Database Successful!");
})
    .catch(function (error) {
    console.error("Connect Database Fail:", error);
});
exports.default = sequelize;
