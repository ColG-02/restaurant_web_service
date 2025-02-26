import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routers/user.router';
import restaurantRouter from './routers/restaurant.router';
import mealRouter from './routers/meal.router';
import orderRouter from './routers/order.router';

const app = express();

app.use(cors());
app.use(express.json());



mongoose.connect('mongodb://127.0.0.1:27017/kutak_dobre_hrane')
const conn = mongoose.connection
conn.once('open', ()=>{
    console.log("Database connected")
})

const router = express.Router()
router.use('/users', userRouter)
router.use('/restaurants', restaurantRouter);
router.use('/meals', mealRouter);
router.use('/orders', orderRouter);

app.use("/" ,router)
app.listen(4000, () => console.log(`Express server running on port 4000`));