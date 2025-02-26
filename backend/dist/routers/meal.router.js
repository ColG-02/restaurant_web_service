"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const meal_controller_1 = require("../controllers/meal.controller");
const mealRouter = express_1.default.Router();
mealRouter.route("/getMeals").post((req, res) => new meal_controller_1.MealController().getMeals(req, res));
exports.default = mealRouter;
