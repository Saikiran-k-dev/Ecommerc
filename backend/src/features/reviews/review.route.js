//3rd party imports
import express from "express"

//my imports
import ReviewController from "./review.controller.js"
import jwtAuth from "../../middleware/jwtAuth.js"

//creating the controller
const reviewController = new ReviewController

//creating the route
const reviewRouter = express.Router()

reviewRouter.post('/:productId',jwtAuth,(req,res)=>{
    reviewController.addReview(req,res)
})

reviewRouter.get('/:productId',(req,res)=>{
    reviewController.getReviewByProduct(req,res)
})

reviewRouter.get('/',jwtAuth,(req,res)=>{
    reviewController.getReviewByuser(req,res)
})

reviewRouter.put('/:reviewId',jwtAuth,(req,res)=>{
    reviewController.updateReview(req,res)
})

reviewRouter.delete('/:reviewId',jwtAuth,(req,res)=>{
    reviewController.deleteReview(req,res)
})

export default reviewRouter