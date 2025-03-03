"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelize = new sequelize_1.Sequelize("".concat(process.env.DATABASE_NAME), "".concat(process.env.USER_NAME), // username
"".concat(process.env.PASSWORD), // password
{
    host: "".concat(process.env.HOST),
    dialect: 'mysql'
});
sequelize.authenticate().then(function () {
    console.log('Connect Database Successful!');
}).catch(function (error) {
    console.error('Connect Database Fail: ', error);
});
exports.default = sequelize;
