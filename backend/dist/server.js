"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const restaurant_router_1 = __importDefault(require("./routers/restaurant.router"));
const meal_router_1 = __importDefault(require("./routers/meal.router"));
const order_router_1 = __importDefault(require("./routers/order.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb://127.0.0.1:27017/kutak_dobre_hrane');
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log("Database connected");
});
const router = express_1.default.Router();
router.use('/users', user_router_1.default);
router.use('/restaurants', restaurant_router_1.default);
router.use('/meals', meal_router_1.default);
router.use('/orders', order_router_1.default);
app.use("/", router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
