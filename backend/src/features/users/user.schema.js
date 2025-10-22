//3rd party import
import mongoose from "mongoose";

//creating a schema
const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      role: {
        type: String,
        enum:['user','admin'],
        default: "user" // user or admin
      }
    },
    { timestamps: true }
  );
  
//exporting the schema
export default userSchema