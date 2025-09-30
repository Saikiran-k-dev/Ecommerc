//3rd party imports
import express from "express"
import UserController from "./user.controller.js"

//creation of route
const userRouter = express.Router()
const userController = new UserController

//calling the signin function
userRouter.post("/sign-in",(req,res)=>{
    userController.signIn(req,res)
})

//calling the sign-up function
userRouter.post("/sign-up",(req,res)=>{
    console.log("hi")
    userController.signUp(req,res)
})

//calling sign-in function
userRouter.post("/sign-in",(req,res)=>{
    userController.signIn(req,res)
})

export default userRouter