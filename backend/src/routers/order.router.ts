import express from 'express'
import { OrderController } from '../controllers/order.controller'

const orderRouter = express.Router()


orderRouter.route("/placeOrder").post(
    (req,res)=>new OrderController().placeOrder(req,res)
)

orderRouter.route("/getAll").get(
    (req,res)=>new OrderController().getAll(req,res)
)

orderRouter.route("/acceptOrder").post(
    (req,res)=>new OrderController().acceptOrder(req,res)
)

orderRouter.route("/denyOrder").post(
    (req,res)=>new OrderController().denyOrder(req,res)
)

export default orderRouter;