//3rd party import
import express from "express"

//my import
import ProductController from "./product.controller.js"


//creating the route
const productRouter = express.Router()
const productController = new ProductController

//adding new product
productRouter.post("/new-product",(req,res)=>{
    console.log("hi")
    productController.addNewProduct(req,res)
})

//retrievieng all products
productRouter.get("/get-all-products",(req,res)=>{
    productController.getAllProducts(req,res)
})

export default productRouter