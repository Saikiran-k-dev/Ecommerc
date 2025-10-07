import mongoose from "mongoose";


//my imports
import productSchema from "../products/product.schema.js";
import reviewSchema from "./review.schema.js";

//creating the models
const productModel =  mongoose.model(productSchema)
const reviewModel = mongoose.model(reviewSchema)


const ObjectId = mongoose.Types.ObjectId;

//creating the class for repository
export default class ReviewRepository{
    constructor(){}
    //adding a review
    async addReview(userId, productId, review) {
        const { rating, comment } = review;
      
        try {
          // Check if review already exists
          const isReviewExist = await reviewModel.findOne({ 
            user: ObjectId(userId), 
            product: ObjectId(productId) 
          });
          if (isReviewExist) {
            return "Review for this product already exists";
          }
      
          // Create new review
          const newReview = new reviewModel({
            user: ObjectId(userId),
            product: ObjectId(productId),
            rating,
            comment
          });
          await newReview.save();
      
          // Update product
          const product = await productModel.findById(productId);
          product.reviews.push(newReview._id);
          product.numReviews = product.reviews.length;
          
          // Update average rating
          const totalRating = await reviewModel.aggregate([
            { $match: { product: ObjectId(productId) } },
            { $group: { _id: null, avgRating: { $avg: "$rating" } } }
          ]);
          product.rating = totalRating[0]?.avgRating || rating;
      
          await product.save();
      
          return newReview;
      
        } catch (error) {
          throw new Error("Review adding is unsuccessful");
        }
      }
}