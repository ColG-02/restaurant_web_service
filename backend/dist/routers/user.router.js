"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route("/login").post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route("/adminLogin").post((req, res) => new user_controller_1.UserController().adminLogin(req, res));
userRouter.route("/register").post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route("/getQuestion").post((req, res) => new user_controller_1.UserController().getQuestion(req, res));
userRouter.route("/goToReset").post((req, res) => new user_controller_1.UserController().goToReset(req, res));
userRouter.route("/changePassword").post((req, res) => new user_controller_1.UserController().changePassword(req, res));
userRouter.route("/editProfile").post((req, res) => new user_controller_1.UserController().editProfile(req, res));
userRouter.route("/addPenaltyPoints").post((req, res) => new user_controller_1.UserController().addPenaltyPoints(req, res));
userRouter.route("/getAll").get((req, res) => new user_controller_1.UserController().getAll(req, res));
userRouter.route("/setActive").post((req, res) => new user_controller_1.UserController().setActive(req, res));
exports.default = userRouter;
