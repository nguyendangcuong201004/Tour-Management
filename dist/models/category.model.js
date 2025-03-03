"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var database_1 = __importDefault(require("../configs/database"));
var Category = database_1.default.define("Tour", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING(500),
    },
    description: {
        type: sequelize_1.DataTypes.TEXT('long'),
    },
    status: {
        type: sequelize_1.DataTypes.STRING(20),
    },
    position: {
        type: sequelize_1.DataTypes.INTEGER
    },
    slug: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
    }
}, {
    tableName: 'categories',
    timestamps: true,
});
exports.default = Category;
