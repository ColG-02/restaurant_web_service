import express from 'express'
import { MealController } from '../controllers/meal.controller'

const mealRouter = express.Router()


mealRouter.route("/getMeals").post(
    (req,res)=>new MealController().getMeals(req,res)
)


export default mealRouter;