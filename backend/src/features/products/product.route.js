//3rd party import
import express from "express"

//my import
import ProductController from "./product.controller.js"
import jwtAuth from "../../middleware/jwtAuth.js"


//creating the route
const productRouter = express.Router()
const productController = new ProductController

//adding new product
productRouter.post("/new-product",jwtAuth,(req,res)=>{
    productController.addNewProduct(req,res)
})

//retrievieng all products
productRouter.get("/",(req,res)=>{
    productController.getAllProducts(req,res)
})

//retrieving a single prpoduct by id
productRouter.get("/:productId",(req,res)=>{
    productController.getOneProduct(req,res)
})

//updating the product
productRouter.put("/:productId",(req,res)=>{
    productController.updateProduct(req,res)
})

//deleting the product
productRouter.delete("/:productId",(req,res)=>{
    productController.deleteProduct(req,res)
})
export default productRouter