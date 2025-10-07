//3rd party imports
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    product:{type:mongoose.Schema.Types.ObjectId, ref:"Product", required:true},
    rating:{type:Number,required:true},
    Comment:{type:String,required:true}
},
{timestamps:true}


)

export default reviewSchema