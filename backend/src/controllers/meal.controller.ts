import express from 'express'
import MealM from '../models/meal'

export class MealController{


    getMeals = (req: express.Request, res: express.Response)=>{

        let rest = req.body.restaurant;

        MealM.find({restaurant:rest}).then(meals=>{
            res.json(meals)
        }).catch((err)=>{
            console.log(err)
        })
    }

}