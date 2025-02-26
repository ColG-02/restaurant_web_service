import express from 'express'
import { UserController } from '../controllers/user.controller'

const userRouter = express.Router()

userRouter.route("/login").post(
    (req,res)=>new UserController().login(req,res)
)

userRouter.route("/adminLogin").post(
    (req,res)=>new UserController().adminLogin(req,res)
)

userRouter.route("/register").post(
    (req,res)=>new UserController().register(req,res)
)

userRouter.route("/getQuestion").post(
    (req,res)=>new UserController().getQuestion(req,res)
)

userRouter.route("/goToReset").post(
    (req,res)=>new UserController().goToReset(req,res)
)

userRouter.route("/changePassword").post(
    (req,res)=>new UserController().changePassword(req,res)
)

userRouter.route("/editProfile").post(
    (req,res)=>new UserController().editProfile(req,res)
)

userRouter.route("/addPenaltyPoints").post(
    (req,res)=>new UserController().addPenaltyPoints(req,res)
)

userRouter.route("/getAll").get(
    (req,res)=>new UserController().getAll(req,res)
)

userRouter.route("/setActive").post(
    (req,res)=>new UserController().setActive(req,res)
)

export default userRouter;