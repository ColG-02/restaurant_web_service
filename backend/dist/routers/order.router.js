"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const orderRouter = express_1.default.Router();
orderRouter.route("/placeOrder").post((req, res) => new order_controller_1.OrderController().placeOrder(req, res));
orderRouter.route("/getAll").get((req, res) => new order_controller_1.OrderController().getAll(req, res));
orderRouter.route("/acceptOrder").post((req, res) => new order_controller_1.OrderController().acceptOrder(req, res));
orderRouter.route("/denyOrder").post((req, res) => new order_controller_1.OrderController().denyOrder(req, res));
exports.default = orderRouter;
