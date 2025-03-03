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
exports.editPatch = exports.edit = exports.changeStatus = exports.createPost = exports.create = exports.index = void 0;
var tour_model_1 = __importDefault(require("../../models/tour.model"));
var category_model_1 = __importDefault(require("../../models/category.model"));
var generate_helper_1 = require("../../helpers/generate.helper");
var tour_category_model_1 = __importDefault(require("../../models/tour-category.model"));
var system_1 = require("../../configs/system");
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tours;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tour_model_1.default.findAll({
                    where: {
                        deleted: false,
                    },
                    raw: true,
                })];
            case 1:
                tours = _a.sent();
                tours.forEach(function (item) {
                    if (item["images"]) {
                        var images = JSON.parse(item["images"]);
                        item["image"] = images[0];
                    }
                    item["price_special"] = (item["price"] * (1 - item["discount"] / 100));
                });
                res.render("admin/pages/tours/index.pug", {
                    pageTitle: "Mixiviu",
                    tours: tours
                });
                return [2 /*return*/];
        }
    });
}); };
exports.index = index;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categories;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, category_model_1.default.findAll({
                    where: {
                        deleted: false,
                    },
                    raw: true
                })];
            case 1:
                categories = _a.sent();
                res.render("admin/pages/tours/create.pug", {
                    pageTitle: "Mixivivu",
                    categories: categories
                });
                return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, countTour, dataTour, tour, tourId, code, dataTourCategory;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                if (!!data.postion) return [3 /*break*/, 2];
                return [4 /*yield*/, tour_model_1.default.count()];
            case 1:
                countTour = _a.sent();
                data.position = countTour + 1;
                return [3 /*break*/, 3];
            case 2:
                data.postion = parseInt(data.postion);
                _a.label = 3;
            case 3:
                dataTour = {
                    title: data.title,
                    code: "",
                    images: JSON.stringify(data.images),
                    price: parseInt(data.price),
                    discount: parseInt(data.discount),
                    timeStart: data.timeStart,
                    stock: data.stock,
                    status: data.status,
                    position: data.position,
                    information: data.information,
                    schedule: data.schedule
                };
                return [4 /*yield*/, tour_model_1.default.create(dataTour)];
            case 4:
                tour = _a.sent();
                tourId = tour.dataValues.id;
                code = (0, generate_helper_1.generateTourCode)(tourId);
                return [4 /*yield*/, tour_model_1.default.update({
                        code: code,
                    }, {
                        where: {
                            id: tourId,
                        }
                    })];
            case 5:
                _a.sent();
                dataTourCategory = {
                    tour_id: tourId,
                    category_id: parseInt(data.category_id)
                };
                return [4 /*yield*/, tour_category_model_1.default.create(dataTourCategory)];
            case 6:
                _a.sent();
                res.redirect("/".concat(system_1.systemConfig.prefixAdmin, "/tours"));
                return [2 /*return*/];
        }
    });
}); };
exports.createPost = createPost;
// [PATCH] /admin/tours/change-status/:status/:id
var changeStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var status, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = req.params.status;
                id = req.params.id;
                return [4 /*yield*/, tour_model_1.default.update({
                        status: status
                    }, {
                        where: {
                            id: id
                        }
                    })];
            case 1:
                _a.sent();
                res.redirect("back");
                return [2 /*return*/];
        }
    });
}); };
exports.changeStatus = changeStatus;
// [GET] /admin/tours/edit/:id
var edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tour, categories, tour_categories, formattedTimeStart, images;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tour_model_1.default.findOne({
                    where: {
                        id: req.params.id,
                    },
                    raw: true
                })];
            case 1:
                tour = _a.sent();
                return [4 /*yield*/, category_model_1.default.findAll({
                        where: {
                            deleted: false,
                        },
                        raw: true
                    })];
            case 2:
                categories = _a.sent();
                console.log(tour);
                return [4 /*yield*/, tour_category_model_1.default.findOne({
                        where: {
                            tour_id: req.params.id
                        },
                        raw: true
                    })];
            case 3:
                tour_categories = _a.sent();
                console.log(tour);
                formattedTimeStart = "";
                images = "";
                if (tour) {
                    formattedTimeStart = tour["timeStart"].toISOString().slice(0, 16);
                    images = (JSON.parse(tour["images"]));
                }
                res.render("admin/pages/tours/edit.pug", {
                    pageTitle: "Mixivivu",
                    tour: tour,
                    categories: categories,
                    tour_categories: tour_categories,
                    formattedTimeStart: formattedTimeStart,
                    images: images
                });
                return [2 /*return*/];
        }
    });
}); };
exports.edit = edit;
// [PATCH] /admin/tours/edit/:id
var editPatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send("OKOKOK");
        return [2 /*return*/];
    });
}); };
exports.editPatch = editPatch;
