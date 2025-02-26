"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    restaurant: String,
    name: String,
    status: String,
    expectedDeliveryTime: String,
    dateAndTime: String,
    bill: Number,
    meals: Array
});
exports.default = mongoose_1.default.model('OrderModel', orderSchema, 'orders');
