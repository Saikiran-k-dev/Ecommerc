//my imports
import ReviewRepository from "./review.repository.js";

//creating controller class
export default class ReviewController{
    constructor(){
        this.reviewRepository = new ReviewRepository()
    }

    async addReview(req,res){
        try {
            const userId = req.user.id
            const productId =  req.params.productId
            const review = req.body
            console.log(userId,productId,review)
            const addedReview = await this.reviewRepository.addReview(userId,productId,review)
            res.status(200).send(addedReview)

        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    async getReviewByProduct(req,res){
        try {
            const productId = req.params.productId
            const reviews = await this.reviewRepository.getReviewByProduct(productId)
            return reviews
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    async getReviewByuser(req,res){
        try {
            const userId = req.params.userId
            const reviews = await this.reviewRepository.getReviewByUser(userId)
            return reviews
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    async updateReview(req,res){
        try {
            const updatedReview = req.body
            const reviewId = req.params.reviewId
            const userId = req.user.id
            const review = await this.reviewRepository.updateReview(userId,reviewId,updatedReview)
            return review
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    async deleteReview(req,res){
        try {
            const userId = req.user.id
            const reviewId = req.params.reviewId
            const deletedReview = await this.reviewRepository.deleteReview(reviewId,userId)
            res.status(201).send("review deleted successfully")
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}

