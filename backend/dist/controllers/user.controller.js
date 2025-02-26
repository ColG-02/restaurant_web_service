"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let usernameP = req.body.username;
            let passwordP = req.body.password;
            user_1.default.findOne({ username: usernameP, password: passwordP, type: { $ne: 'admin' } }).then((user) => {
                res.json(user);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.adminLogin = (req, res) => {
            let usernameP = req.body.username;
            let passwordP = req.body.password;
            user_1.default.findOne({ username: usernameP, password: passwordP, type: 'admin' }).then((user) => {
                res.json(user);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.register = (req, res) => {
            let user = {
                username: req.body.username,
                password: req.body.password,
                question: req.body.question,
                answer: req.body.answer,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                gender: req.body.gender,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email,
                card: req.body.card,
                type: req.body.type,
                profilePicture: req.body.profilePicture ? req.body.profilePicture : "",
                active: req.body.active
            };
            user_1.default.findOne({ email: user.email }).then((x) => {
                if (x) {
                    user_1.default.findOne({ username: user.username }).then((x) => {
                        x ? res.json({
                            'errorMail': "E-mail already taken",
                            'errorUser': "Username already taken"
                        }) : res.json({
                            'errorMail': "E-mail already taken",
                            'errorUser': ""
                        });
                    }).catch(err => { console.log(err); });
                }
                else {
                    user_1.default.findOne({ username: user.username }).then((x) => {
                        if (x)
                            res.json({
                                'errorMail': "",
                                'errorUser': "Username already taken"
                            });
                        else {
                            new user_1.default(user).save().then(ok => {
                                res.json(user);
                            }).catch(err => {
                                console.log(err);
                            });
                        }
                    }).catch(err => { console.log(err); });
                }
            }).catch(err => { console.log(err); });
        };
        this.getQuestion = (req, res) => {
            let usernameP = req.body.username;
            user_1.default.findOne({ username: usernameP }).then((user) => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json(user.question);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.goToReset = (req, res) => {
            let usernameP = req.body.username;
            let answerP = req.body.answer;
            user_1.default.findOne({ username: usernameP, answer: answerP }).then((user) => {
                res.json(user);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.changePassword = (req, res) => {
            let usernameP = req.body.username;
            let passwordP = req.body.newPassword;
            user_1.default.updateOne({ username: usernameP }, { password: passwordP }).then((user) => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.editProfile = (req, res) => {
            let oldUsername = req.body.oldUsername;
            let user = {
                username: req.body.newUser.username,
                password: req.body.newUser.password,
                question: req.body.newUser.question,
                answer: req.body.newUser.answer,
                firstname: req.body.newUser.firstname,
                lastname: req.body.newUser.lastname,
                gender: req.body.newUser.gender,
                address: req.body.newUser.address,
                phone: req.body.newUser.phone,
                email: req.body.newUser.email,
                card: req.body.newUser.card,
                type: req.body.newUser.type,
                profilePicture: req.body.newUser.profilePicture ? req.body.newUser.profilePicture : "",
                active: req.body.newUser.active
            };
            user_1.default.findOneAndUpdate({ username: oldUsername }, user, { new: true }).then((user) => {
                res.json(user);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.addPenaltyPoints = (req, res) => {
            let username = req.body.name;
            user_1.default.findOneAndUpdate({ username: username }, { $inc: { active: 1 } }, { new: true }).then((user) => {
                res.json("ok");
            }).catch((err) => {
                console.log(err);
            });
        };
        this.getAll = (req, res) => {
            user_1.default.find({}).then(users => {
                res.json(users);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.setActive = (req, res) => {
            let usernameP = req.body.username;
            let activeP = req.body.active;
            user_1.default.updateOne({ username: usernameP }, { active: activeP }).then((user) => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
    }
}
exports.UserController = UserController;
