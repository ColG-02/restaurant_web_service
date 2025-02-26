import mongoose from 'mongoose'

const mealSchema = new mongoose.Schema(
    {
        name:String,
        image:String,
        price:Number,
        ingredients:Array,
        restaurant:String
    }
);

export default mongoose.model('MealModel', mealSchema, 'meals');