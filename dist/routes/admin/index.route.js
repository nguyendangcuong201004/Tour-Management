"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var category_route_1 = require("./category.route");
var system_1 = require("../../configs/system");
var tour_route_1 = require("./tour.route");
var adminRoutes = function (app) {
    var path = "/".concat(system_1.systemConfig.prefixAdmin);
    app.use("".concat(path, "/categories"), category_route_1.categoryRoutes);
    app.use("".concat(path, "/tours"), tour_route_1.tourRoutes);
};
exports.default = adminRoutes;
