import mongoose from "mongoose";
import orderSchema from "./order.schema.js";

const OrderModel = mongoose.model("Order", orderSchema);

export default class OrderRepository {
  // Create a new order
  async createOrder(orderData) {
    try {
      const order = new OrderModel(orderData);
      await order.save();
      return order;
    } catch (error) {
      throw new Error("Error creating order: " + error.message);
    }
  }

  // Get all orders of a user
  async getOrdersByUser(userId) {
    return await OrderModel.find({ user: userId })
      .populate("orderItems.product", "name price")
      .sort({ createdAt: -1 });
  }

  // Get one order by ID
  async getOrderById(orderId) {
    const order = await OrderModel.findById(orderId).populate("user", "name email");
    if (!order) throw new Error("Order not found");
    return order;
  }

  // Admin: Get all orders
  async getAllOrders() {
    return await OrderModel.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
  }

  // Update order status (Admin)
  async updateOrderStatus(orderId, status) {
    const order = await OrderModel.findById(orderId);
    if (!order) throw new Error("Order not found");

    order.orderStatus = status;
    await order.save();
    return order;
  }

  // Delete order (optional)
  async deleteOrder(orderId) {
    const order = await OrderModel.findById(orderId);
    if (!order) throw new Error("Order not found");

    await order.deleteOne();
    return "Order deleted successfully";
  }
}
