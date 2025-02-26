import express from 'express'
import OrderM from '../models/order'

export class OrderController{

    placeOrder = (req: express.Request, res: express.Response)=>{

        new OrderM(req.body.order).save().then(ok=>{
            res.json("ok");
        }).catch(err=>{
            console.log(err)
        })
    }

    getAll = (req: express.Request, res: express.Response)=>{
        OrderM.find({}).then(orders=>{
            res.json(orders)
        }).catch((err)=>{
            console.log(err)
        })
    }

    acceptOrder = (req: express.Request, res: express.Response)=>{

        let restaurant = req.body.restaurant;
        let name = req.body.name;
        let date = req.body.dateAndTime;

        let status = req.body.status;
        let expectedTime = req.body.expectedDeliveryTime;


        OrderM.updateOne({restaurant: restaurant, name: name, dateAndTime: date},
            {status: status,expectedDeliveryTime: expectedTime}).then(ok=>{
            res.json("ok");
        }).catch(err=>{
            console.log(err)
        })
    }

    denyOrder = (req: express.Request, res: express.Response)=>{

        let restaurant = req.body.restaurant;
        let name = req.body.name;
        let date = req.body.dateAndTime;

        let status = req.body.status;


        OrderM.updateOne({restaurant: restaurant, name: name, dateAndTime: date},
            {status: status}).then(ok=>{
            res.json("ok");
        }).catch(err=>{
            console.log(err)
        })
    }

}