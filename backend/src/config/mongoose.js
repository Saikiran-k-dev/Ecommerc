//3rd party imports
import mongoose from "mongoose"
import dotenv from "dotenv"

//initializing .env file
dotenv.config()

//getting the url from .env file
const url = process.env.MONGODB_URL

//connection to mongodb
export const connectToMongoDbUsingMongoose = async() =>{
    try {
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("connected to mongodb")
    } catch (error) {
        console.error("failed to connect to mongodb", error)
        process.exit(1)
    }
}