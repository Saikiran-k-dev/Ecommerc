import mongoose from "mongoose";


//my imports
import productSchema from "../products/product.schema.js";
import reviewSchema from "./review.schema.js";

//creating the models
const productModel =  mongoose.model('Product',productSchema)
const reviewModel = mongoose.model('Review',reviewSchema)


const ObjectId = mongoose.Types.ObjectId;

//creating the class for repository
export default class ReviewRepository{
    constructor(){}
    //adding a review
    async addReview(userId, productId, review) {
        const { rating, Comment } = review;
      
        try {
          // Check if review already exists
          const isReviewExist = await reviewModel.findOne({ 
            user: new ObjectId(userId), 
            product: new ObjectId(productId) 
          });
          if (isReviewExist) {
            return "Review for this product already exists";
          } 
          // Create new review
          const newReview = new reviewModel({
            user: new ObjectId(userId),
            product: new ObjectId(productId),
            rating,
            Comment
          });
          await newReview.save();
          console.log("hi")
          // Update product
          const product = await productModel.findById(productId);
          product.reviews.push(newReview._id);
          product.numReviews = product.reviews.length;
          
          // Update average rating
          const totalRating = await reviewModel.aggregate([
            { $match: { product: new ObjectId(productId) } },
            { $group: { _id: null, avgRating: { $avg: "$rating" } } }
          ]);
          product.rating = totalRating[0]?.avgRating || rating;
      
          await product.save();
      
          return newReview;
      
        } catch (error) {
          console.log(error)
          throw new Error("Review adding is unsuccessful");
        }
      }

    async getReviewByProduct(productId){
      try {
        const reviews = await productModel.findById({product:productId})
        if(!reviews){
          throw new Error("this product dont have reviews")
        } else {
          return reviews
        }
      } catch (error) {
        throw new Error("no reviews yet")
      }
    }

    async getReviewByUser(userId){
      try {
        const reviews = await productModel.find({user:userId}).populate("product","name")
        if(!reviews){
          throw new Error ("you dont have any reviews posted")
        } else {
          return reviews
        }
      } catch (error) {
        throw new Error("Error while fetching user reviews")
      }
    }

    async updateReview(userId,reviewId,updatedData){
      try {
        const review = await reviewModel.findById(reviewId)
        if(!review) throw new Error("review not found")
        
        if(review.user.toString()!==userId){
          throw new Error("Not authorized to edit this review")
        }

        review.rating = updatedData.rating || review.rating
        review.Comment = updatedData.comment || review.Comment
        await review.save()
        return review
      } catch (error) {
        throw new Error("error updating review")
      }
    }

    async deleteReview(reviewId,userId){
      try {
        const review = await reviewModel.findById(reviewId)
        if(!review) throw new Error("review not found")

        if(review.user.toString()!==userId){
          throw new Error("not authorised to delete this review")

        }

        const product = await productModel.findById(review.product)
        if(product){
          product.reviews = product.reviews.filter(r=>r.toString()!==reviewId)
          product.numReviews-=1
          await product.save()
        }

        await review.remove()
        return "review deleted successfully"
      } catch (error) {
        throw new Error("Error while deleting the review")
      }
    }
}