//3rd party imports
import express from "express"
import dotenv from "dotenv"

//my imports
import { connectToMongoDbUsingMongoose } from "./config/mongoose.js"
import userRouter from "./features/users/user.routes.js"
import bodyParser from "body-parser"
import productRouter from "./features/products/product.route.js"

//dotenv initialization
dotenv.config()

//server creation
const app = express()

//using the body-parser
app.use(bodyParser.json())

//user apis
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)


//getting the port number from .env file so make sure to create one
const port = process.env.PORT

//running the server and connection to mongodb
app.listen(port, async()=>{
    await connectToMongoDbUsingMongoose()
    console.log(`server is running in the port ${port}`)
}
    
)