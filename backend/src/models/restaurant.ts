import mongoose from 'mongoose'

const restaurantSchema = new mongoose.Schema(
    {
        name: String,
        address: String,
        phone: String,
        type: String,
        waiters:Array,
        location:String,
        reservations:[
            {
                dateAndTime: String,
                persons: Number,
                extras: String,
                name: String,
                restaurant: String,
                served: Boolean,
                review: {
                    text: String,
                    rating: Number,
                    author: String
                },
                status: String,
                message: String,
                tableId: Number,
                waiter: String,
                time:Number
            }
        ],
        //description:String,
        tables: Array,
        workingHours: String
    }
);

export default mongoose.model('RestaurantModel', restaurantSchema, 'restaurants');