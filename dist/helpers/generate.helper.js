"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTourCode = exports.generateOrderCode = void 0;
var generateOrderCode = function (number) {
    var code = "OD".concat(String(number).padStart(8, '0'));
    return code;
};
exports.generateOrderCode = generateOrderCode;
var generateTourCode = function (number) {
    var code = "TOUR".concat(String(number).padStart(6, '0'));
    return code;
};
exports.generateTourCode = generateTourCode;
