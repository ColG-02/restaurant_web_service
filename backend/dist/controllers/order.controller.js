"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_1 = __importDefault(require("../models/order"));
class OrderController {
    constructor() {
        this.placeOrder = (req, res) => {
            new order_1.default(req.body.order).save().then(ok => {
                res.json("ok");
            }).catch(err => {
                console.log(err);
            });
        };
        this.getAll = (req, res) => {
            order_1.default.find({}).then(orders => {
                res.json(orders);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.acceptOrder = (req, res) => {
            let restaurant = req.body.restaurant;
            let name = req.body.name;
            let date = req.body.dateAndTime;
            let status = req.body.status;
            let expectedTime = req.body.expectedDeliveryTime;
            order_1.default.updateOne({ restaurant: restaurant, name: name, dateAndTime: date }, { status: status, expectedDeliveryTime: expectedTime }).then(ok => {
                res.json("ok");
            }).catch(err => {
                console.log(err);
            });
        };
        this.denyOrder = (req, res) => {
            let restaurant = req.body.restaurant;
            let name = req.body.name;
            let date = req.body.dateAndTime;
            let status = req.body.status;
            order_1.default.updateOne({ restaurant: restaurant, name: name, dateAndTime: date }, { status: status }).then(ok => {
                res.json("ok");
            }).catch(err => {
                console.log(err);
            });
        };
    }
}
exports.OrderController = OrderController;
