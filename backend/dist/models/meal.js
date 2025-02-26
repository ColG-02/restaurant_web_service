"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mealSchema = new mongoose_1.default.Schema({
    name: String,
    image: String,
    price: Number,
    ingredients: Array,
    restaurant: String
});
exports.default = mongoose_1.default.model('MealModel', mealSchema, 'meals');
