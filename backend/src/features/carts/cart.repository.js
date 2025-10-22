import mongoose from "mongoose";

import cartSchema from "./cart.schema.js";
import productSchema from "../products/product.schema.js";

const CartModel = mongoose.model("Cart",cartSchema)

export default class CartRepository{
    async addToCart(userId,productId,quantity=1){
        let cart = await CartModel.findOne({user:userId})

        if(!cart){
            cart = new CartModel({user:userId,items:[],totalPrice:0})
        }

        const productIndex = cart.items.findIndex(
            (item)=>item.product.toString()===productId
        )

        if(productIndex>-1){
            cart.items[productIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save()
        return cart
    }

    async getCart(userId) {
        return await CartModel.findOne({ user: userId }).populate("items.product");
      }

      async updateCartItem(userId, productId, quantity) {
        const cart = await CartModel.findOne({ user: userId });
        if (!cart) throw new Error("Cart not found");
    
        const item = cart.items.find(
          (i) => i.product.toString() === productId
        );
        if (!item) throw new Error("Product not found in cart");
    
        item.quantity = quantity;
        await cart.save();
        return cart;
      }
    
      async removeFromCart(userId, productId) {
        const cart = await CartModel.findOne({ user: userId });
        if (!cart) throw new Error("Cart not found");
    
        cart.items = cart.items.filter(
          (i) => i.product.toString() !== productId
        );
    
        await cart.save();
        return cart;
      }

      async clearCart(userId) {
        const cart = await CartModel.findOne({ user: userId });
        if (!cart) throw new Error("Cart not found");
    
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();
        return cart;
      }
}