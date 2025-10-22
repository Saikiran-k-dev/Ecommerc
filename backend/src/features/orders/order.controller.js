import OrderRepository from "./order.repository.js";

export default class OrderController {
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async createOrder(req, res) {
    try {
      const userId = req.userId; // from jwtAuth middleware
      const { orderItems, shippingAddress, paymentMethod, totalAmount } = req.body;

      if (!orderItems || orderItems.length === 0)
        return res.status(400).send({ message: "No order items provided" });

      const order = await this.orderRepository.createOrder({
        user: userId,
        orderItems,
        shippingAddress,
        paymentMethod,
        totalAmount,
      });

      res.status(201).send({ message: "Order placed successfully", order });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async getOrdersByUser(req, res) {
    try {
      const userId = req.userId;
      const orders = await this.orderRepository.getOrdersByUser(userId);
      res.status(200).send(orders);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async getOrderById(req, res) {
    try {
      const { id } = req.params;
      const order = await this.orderRepository.getOrderById(id);
      res.status(200).send(order);
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  }

  async getAllOrders(req, res) {
    try {
      const orders = await this.orderRepository.getAllOrders();
      res.status(200).send(orders);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const order = await this.orderRepository.updateOrderStatus(orderId, status);
      res.status(200).send({ message: "Order status updated", order });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}
