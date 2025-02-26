import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
    {
        restaurant:String,
        name:String,
        status:String,
        expectedDeliveryTime:String,
        dateAndTime:String,
        bill:Number,
        meals:Array
    }
);

export default mongoose.model('OrderModel', orderSchema, 'orders');