import express from 'express'
import ResM from '../models/restaurant'

export class RestaurantController{


    getAll = (req: express.Request, res: express.Response)=>{
        ResM.find({}).then(resta=>{
            res.json(resta)
        }).catch((err)=>{
            console.log(err)
        })
    }

    makeReservation = (req: express.Request, res: express.Response)=>{
        ResM.updateOne({name: req.body.reservation.restaurant}, {$push: {reservations: req.body.reservation}}).then(data=>{
                res.json("ok")
            }).catch(err=>{
                res.json({message: "Fail"})
            })
    }

    cancelReservation = (req: express.Request, res: express.Response)=>{
        ResM.updateOne({ name: req.body.reservation.restaurant },
            { $pull: { reservations: { dateAndTime: req.body.reservation.dateAndTime, name: req.body.reservation.name } } }).then(data=>{
                res.json("ok")
            }).catch(err=>{
                res.json({message: "Fail"})
            })
    }

    addComment = (req: express.Request, res: express.Response) => {

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
      
        ResM.findOneAndUpdate(filter, update, options).then(result => {
          res.json("ok");
        }).catch(err => {
          res.status(500).json({ message: 'Failed to add comment' });
        });
    }

    acceptReservation = (req: express.Request, res: express.Response)=>{

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
                'reservations.$.waiter':req.body.waiter
            }
        };
    
        const options = { new: true };
    
        ResM.findOneAndUpdate(filter, update, options).then(data=>{
                        res.json("ok")
                    }).catch(err=>{
                        res.json({message: "Fail"})
                    })
    }

    denyReservation = (req: express.Request, res: express.Response)=>{

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
    
        ResM.findOneAndUpdate(filter, update, options).then(data=>{
                        res.json("ok")
                    }).catch(err=>{
                        res.json({message: "Fail"})
                    })
    }

    confirmGuests = (req: express.Request, res: express.Response)=>{

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
    
        ResM.findOneAndUpdate(filter, update, options).then(data=>{
                        res.json("ok")
                    }).catch(err=>{
                        res.json({message: "Fail"})
                    })
    }

    freeTable = (req: express.Request, res: express.Response)=>{

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
    
        ResM.findOneAndUpdate(filter, update, options).then(data=>{
                        res.json("ok")
                    }).catch(err=>{
                        res.json({message: "Fail"})
                    })
    }

    extendReservation = (req: express.Request, res: express.Response)=>{

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
    
        ResM.findOneAndUpdate(filter, update, options).then(data=>{
                        res.json("ok")
                    }).catch(err=>{
                        res.json({message: "Fail"})
                    })
    }

    addWaiter = (req: express.Request, res: express.Response)=>{
        ResM.updateOne({name: req.body.name}, {$push: {waiters: req.body.waiter}}).then(data=>{
                res.json("ok")
            }).catch(err=>{
                res.json({message: "Fail"})
            })
    }

    addRestaurant = (req: express.Request, res: express.Response)=>{
        let restaurant = req.body;
        new ResM(restaurant).save().then(ok=>{
            res.json(restaurant);
        }).catch(err=>{
            console.log(err)
        })
    }

    setWorkingHours = (req: express.Request, res: express.Response)=>{
        let name = req.body.restaurant;
        let hours = req.body.hours;

        ResM.updateOne({name: name}, {workingHours: hours}).then((user)=>{
            res.json('ok');
        }).catch((err)=>{
            console.log(err)
        })
    }
}