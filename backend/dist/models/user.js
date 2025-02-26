"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    question: String,
    answer: String,
    firstname: String,
    lastname: String,
    gender: String,
    address: String,
    phone: String,
    email: String,
    card: String,
    type: String,
    profilePicture: String,
    active: Number
});
exports.default = mongoose_1.default.model('UserModel', userSchema, 'users');
