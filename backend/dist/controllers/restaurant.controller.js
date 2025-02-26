"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantController = void 0;
const restaurant_1 = __importDefault(require("../models/restaurant"));
class RestaurantController {
    constructor() {
        this.getAll = (req, res) => {
            restaurant_1.default.find({}).then(resta => {
                res.json(resta);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.makeReservation = (req, res) => {
            restaurant_1.default.updateOne({ name: req.body.reservation.restaurant }, { $push: { reservations: req.body.reservation } }).then(data => {
                res.json("ok");
            }).catch(err => {
                res.json({ message: "Fail" });
            });
        };
        this.cancelReservation = (req, res) => {
            restaurant_1.default.updateOne({ name: req.body.reservation.restaurant }, { $pull: { reservations: { dateAndTime: req.body.reservation.dateAndTime, name: req.body.reservation.name } } }).then(data => {
                res.json("ok");
            }).catch(err => {
                res.json({ message: "Fail" });
            });
        };
        this.addComment = (req, res) => {
            const review = req.body.review;
            const reservation = req.body.reservation;
            const filter = {
                name: reservation.restaurant,
                'reservations': {
                    $elemMatch: {
                        dateAndTime: reservation.dateAndTime,
                        name: reservation.name
                    }
                }
            };
            const update = {
                $set: {
                    'reservations.$.review': review
                }
            };
            const options = { new: true };
            restaurant_1.default.findOneAndUpdate(filter, update, options).then(result => {
                res.json("ok");
            }).catch(err => {
                res.status(500).json({ message: 'Failed to add comment' });
            });
        };
        this.acceptReservation = (req, res) => {
            const filter = {
                name: req.body.restaurant,
                'reservations': {
                    $elemMatch: {
                        dateAndTime: req.body.dateAndTime,
                        name: req.body.name
                    }
                }
            };
            const update = {
                $set: {
                    'reservations.$.status': req.body.status,
                    'reservations.$.tableId': req.body.tableId,
                    'reservations.$.waiter': req.body.waiter
                }
            };
            const options = { new: true };
            restaurant_1.default.findOneAndUpdate(filter, update, options).then(data => {
                res.json("ok");
            }).catch(err => {
                res.json({ message: "Fail" });
            });
        };
        this.denyReservation = (req, res) => {
            const filter = {
                name: req.body.restaurant,
                'reservations': {
                    $elemMatch: {
                        dateAndTime: req.body.dateAndTime,
                        name: req.body.name
                    }
                }
            };
            const update = {
                $set: {
                    'reservations.$.status': req.body.status,
                    'reservations.$.message': req.body.message
                }
            };
            const options = { new: true };
            restaurant_1.default.findOneAndUpdate(filter, update, options).then(data => {
                res.json("ok");
            }).catch(err => {
                res.json({ message: "Fail" });
            });
        };
        this.confirmGuests = (req, res) => {
            const filter = {
                name: req.body.restaurant,
                'reservations': {
                    $elemMatch: {
                        dateAndTime: req.body.dateAndTime,
                        name: req.body.name
                    }
                }
            };
            const update = {
                $set: {
                    'reservations.$.served': req.body.served,
                }
            };
            const options = { new: true };
            restaurant_1.default.findOneAndUpdate(filter, update, options).then(data => {
                res.json("ok");
            }).catch(err => {
                res.json({ message: "Fail" });
            });
        };
        this.freeTable = (req, res) => {
            const filter = {
                name: req.body.restaurant,
                'reservations': {
                    $elemMatch: {
                        dateAndTime: req.body.dateAndTime,
                        name: req.body.name
                    }
                }
            };
            const update = {
                $set: {
                    'reservations.$.status': req.body.status,
                    'reservations.$.message': req.body.message,
                    'reservations.$.tableId': req.body.tableId
                }
            };
            const options = { new: true };
            restaurant_1.default.findOneAndUpdate(filter, update, options).then(data => {
                res.json("ok");
            }).catch(err => {
                res.json({ message: "Fail" });
            });
        };
        this.extendReservation = (req, res) => {
            const filter = {
                name: req.body.restaurant,
                'reservations': {
                    $elemMatch: {
                        dateAndTime: req.body.dateAndTime,
                        name: req.body.name
                    }
                }
            };
            const update = {
                $set: {
                    'reservations.$.time': req.body.time,
                }
            };
            const options = { new: true };
            restaurant_1.default.findOneAndUpdate(filter, update, options).then(data => {
                res.json("ok");
            }).catch(err => {
                res.json({ message: "Fail" });
            });
        };
        this.addWaiter = (req, res) => {
            restaurant_1.default.updateOne({ name: req.body.name }, { $push: { waiters: req.body.waiter } }).then(data => {
                res.json("ok");
            }).catch(err => {
                res.json({ message: "Fail" });
            });
        };
        this.addRestaurant = (req, res) => {
            let restaurant = req.body;
            new restaurant_1.default(restaurant).save().then(ok => {
                res.json(restaurant);
            }).catch(err => {
                console.log(err);
            });
        };
        this.setWorkingHours = (req, res) => {
            let name = req.body.restaurant;
            let hours = req.body.hours;
            restaurant_1.default.updateOne({ name: name }, { workingHours: hours }).then((user) => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
    }
}
exports.RestaurantController = RestaurantController;
