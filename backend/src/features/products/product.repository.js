//3rd party imports
import mongoose from "mongoose";

//my imports
import productSchema from "./product.schema.js";

//creation of the model
const ProductModel = mongoose.model('Product',productSchema)

//class for the product repository
export default class ProductRepository{
    constructor(){}

    //adding new product
    async addNewproduct(productDetails){
        try {
            const newProduct = new ProductModel(productDetails)
            await newProduct.save()
            return newProduct
        } catch (error) {
            throw new Error("error while adding the product")
        }
    }

    //get one product
    async getOneProduct(productId){
        try {
            const isProductFound = await ProductModel.findById(productId)
            console.log(isProductFound)
            if(!isProductFound){
                return "product not found"

            }
            return isProductFound
        } catch (error) {
            throw new Error("error occured on the server side while retrieving")
        }
    }

    //getting all products
    async getAllProducts(){
        try {
            const products = await ProductModel.find()
            if(!products){
                return "no products found"
            }
            return products
        } catch (error) {
            throw new Error("error on server side")
        }
    }

    //getting product by category
    async getProductByCategory(category){
        try {
            const products = await ProductModel.find({category:category})
            if(!products){
                return "no products found in this category"
            }
            return products
        } catch (error) {
            throw new Error("server error")
        }
    }

    //updating the product
    async updateProduct(productId,newProductDetails){
        try {
            const product = await ProductModel.findById(productId)
            if(!product){
                return "product not found"
            }

            //updating with provided fields
            product.name = newProductDetails.name || product.name
            product.description = newProductDetails.description || product.description;
            product.price = newProductDetails.price || product.price;
            product.category = newProductDetails.category || product.category;
            product.countInStock = newProductDetails.countInStock || product.countInStock;
            product.image = newProductDetails.image || product.image;

            const updatedProduct = await product.save()
            // console.log(updatedProduct)
            return updatedProduct

        } catch (error) {
            throw new Error("server error")
        }
    }

    //deleting the product
    async deletingTheProduct(productId){
        try {
            const product = await ProductModel.findById(productId)
            if(!product){
                throw new Error("product not found")
            }
            await product.deleteOne()
            return("product removed")
        } catch (error) {
            throw new Error("server error")
        }
    }
    async getFilteredProducts(query, sort, skip, limit) {
        try {
          return await ProductModel.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit);
        } catch (error) {
          throw new Error("Error while fetching filtered products");
        }
      }
      
      async countProducts(query) {
        try {
          return await ProductModel.countDocuments(query);
        } catch (error) {
          throw new Error("Error while counting products");
        }
      }
}