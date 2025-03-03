"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tour_route_1 = require("./tour.route");
var cateogory_route_1 = require("./cateogory.route");
var home_route_1 = require("./home.route");
var cart_route_1 = require("./cart.route");
var order_route_1 = require("./order.route");
var clientRoutes = function (app) {
    app.use('/', home_route_1.homeRoutes);
    app.use("/tours", tour_route_1.tourRoutes);
    app.use("/categories", cateogory_route_1.categoryRoutes);
    app.use("/cart", cart_route_1.cartRoutes);
    app.use('/order', order_route_1.orderRoutes);
};
exports.default = clientRoutes;
