"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var database_1 = __importDefault(require("../configs/database"));
var slugify_1 = __importDefault(require("slugify"));
var Tour = database_1.default.define("Tour", {
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
    code: {
        type: sequelize_1.DataTypes.STRING(10),
    },
    images: {
        type: sequelize_1.DataTypes.TEXT('long')
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    discount: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    information: {
        type: sequelize_1.DataTypes.TEXT('long'),
    },
    schedule: {
        type: sequelize_1.DataTypes.TEXT('long')
    },
    timeStart: {
        type: sequelize_1.DataTypes.DATE,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER
    },
    status: {
        type: sequelize_1.DataTypes.STRING(20),
    },
    position: {
        type: sequelize_1.DataTypes.INTEGER
    },
    slug: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
    }
}, {
    tableName: 'tours',
    timestamps: true,
});
Tour.beforeCreate(function (tour) {
    tour["slug"] = (0, slugify_1.default)("".concat(tour["title"], "-").concat(Date.now()), {
        lower: true,
        strict: true,
    });
});
exports.default = Tour;
