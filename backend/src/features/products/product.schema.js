//3rd party import
import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    image: { type: String, required: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }]
  },
  { timestamps: true }
  );

  export default productSchema