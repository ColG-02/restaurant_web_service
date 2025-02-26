"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealController = void 0;
const meal_1 = __importDefault(require("../models/meal"));
class MealController {
    constructor() {
        this.getMeals = (req, res) => {
            let rest = req.body.restaurant;
            meal_1.default.find({ restaurant: rest }).then(meals => {
                res.json(meals);
            }).catch((err) => {
                console.log(err);
            });
        };
    }
}
exports.MealController = MealController;
