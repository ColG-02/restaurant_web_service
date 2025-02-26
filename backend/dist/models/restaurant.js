"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const restaurantSchema = new mongoose_1.default.Schema({
    name: String,
    address: String,
    phone: String,
    type: String,
    waiters: Array,
    location: String,
    reservations: [
        {
            dateAndTime: String,
            persons: Number,
            extras: String,
            name: String,
            restaurant: String,
            served: Boolean,
            review: {
                text: String,
                rating: Number,
                author: String
            },
            status: String,
            message: String,
            tableId: Number,
            waiter: String,
            time: Number
        }
    ],
    //description:String,
    tables: Array,
    workingHours: String
});
exports.default = mongoose_1.default.model('RestaurantModel', restaurantSchema, 'restaurants');
