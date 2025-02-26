import express from 'express'
import { RestaurantController } from '../controllers/restaurant.controller'

const restaurantRouter = express.Router()


restaurantRouter.route("/getAll").get(
    (req,res)=>new RestaurantController().getAll(req,res)
)

restaurantRouter.route("/makeReservation").post(
    (req,res)=>new RestaurantController().makeReservation(req,res)
)

restaurantRouter.route("/cancelReservation").post(
    (req,res)=>new RestaurantController().cancelReservation(req,res)
)

restaurantRouter.route("/addComment").post(
    (req,res)=>new RestaurantController().addComment(req,res)
)

restaurantRouter.route("/acceptReservation").post(
    (req,res)=>new RestaurantController().acceptReservation(req,res)
)

restaurantRouter.route("/denyReservation").post(
    (req,res)=>new RestaurantController().denyReservation(req,res)
)

restaurantRouter.route("/confirmGuests").post(
    (req,res)=>new RestaurantController().confirmGuests(req,res)
)

restaurantRouter.route("/freeTable").post(
    (req,res)=>new RestaurantController().freeTable(req,res)
)

restaurantRouter.route("/extendReservation").post(
    (req,res)=>new RestaurantController().extendReservation(req,res)
)

restaurantRouter.route("/addWaiter").post(
    (req,res)=>new RestaurantController().addWaiter(req,res)
)

restaurantRouter.route("/addRestaurant").post(
    (req,res)=>new RestaurantController().addRestaurant(req,res)
)

restaurantRouter.route("/setWorkingHours").post(
    (req,res)=>new RestaurantController().setWorkingHours(req,res)
)


export default restaurantRouter;