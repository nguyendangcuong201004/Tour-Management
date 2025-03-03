"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = exports.index = void 0;
var order_model_1 = __importDefault(require("../../models/order.model"));
var generate_helper_1 = require("../../helpers/generate.helper");
var tour_model_1 = __importDefault(require("../../models/tour.model"));
var order_item_model_1 = __importDefault(require("../../models/order-item.model"));
// [POST] /order
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, dataOrder, order, orderId, code, _i, _a, item, dataOrderItem, tourInfo;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                data = req.body;
                dataOrder = {
                    code: "",
                    fullName: data.info.fullName,
                    phone: data.info.phone,
                    note: data.info.note,
                    status: "initial"
                };
                return [4 /*yield*/, order_model_1.default.create(dataOrder)];
            case 1:
                order = _b.sent();
                orderId = order.dataValues.id;
                code = (0, generate_helper_1.generateOrderCode)(orderId);
                return [4 /*yield*/, order_model_1.default.update({
                        code: code,
                    }, {
                        where: {
                            id: orderId,
                        }
                    })];
            case 2:
                _b.sent();
                _i = 0, _a = data.cart;
                _b.label = 3;
            case 3:
                if (!(_i < _a.length)) return [3 /*break*/, 7];
                item = _a[_i];
                dataOrderItem = {
                    orderId: orderId,
                    tourId: item.tourId,
                    quantity: item.quantity
                };
                return [4 /*yield*/, tour_model_1.default.findOne({
                        where: {
                            id: item.tourId,
                            deleted: false,
                            status: "active"
                        },
                        raw: true
                    })];
            case 4:
                tourInfo = _b.sent();
                dataOrderItem["price"] = tourInfo["price"];
                dataOrderItem["discount"] = tourInfo["discount"];
                dataOrderItem["timeStart"] = tourInfo["timeStart"];
                return [4 /*yield*/, order_item_model_1.default.create(dataOrderItem)];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 3];
            case 7:
                res.json({
                    code: 200,
                    message: "Đặt tour thành công",
                    data: data,
                    dataOrder: dataOrder,
                    orderCode: code,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.index = index;
// [POST] /order/success
var success = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderCode, order, date, orderItem, total_order, _i, orderItem_1, item, tour;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderCode = req.query.orderCode;
                return [4 /*yield*/, order_model_1.default.findOne({
                        where: {
                            code: orderCode,
                        },
                        raw: true
                    })];
            case 1:
                order = _a.sent();
                date = new Date(order["updatedAt"]);
                order["formattedDate"] = date.toLocaleString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour12: false
                });
                return [4 /*yield*/, order_item_model_1.default.findAll({
                        where: {
                            orderId: order["id"]
                        },
                        raw: true,
                    })];
            case 2:
                orderItem = _a.sent();
                total_order = 0;
                _i = 0, orderItem_1 = orderItem;
                _a.label = 3;
            case 3:
                if (!(_i < orderItem_1.length)) return [3 /*break*/, 6];
                item = orderItem_1[_i];
                return [4 /*yield*/, tour_model_1.default.findOne({
                        where: {
                            id: item["tourId"],
                            deleted: false,
                            status: "active"
                        },
                        raw: true
                    })];
            case 4:
                tour = _a.sent();
                item["tour"] = tour;
                item["special_price"] = item["tour"]["price"] * (1 - item["tour"]["discount"] / 100);
                item["total_tour"] = item["special_price"] * item["quantity"];
                total_order += item["total_tour"];
                item["image"] = JSON.parse(item["tour"]["images"])[0];
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6:
                res.render("client/pages/order/success.pug", {
                    pageTitle: "Mixiviu",
                    order: order,
                    orderItem: orderItem,
                    total_order: total_order
                });
                return [2 /*return*/];
        }
    });
}); };
exports.success = success;
