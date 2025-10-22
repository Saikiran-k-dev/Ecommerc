import CartRepository from "./cart.repository.js";

export default class CartController {
  constructor() {
    this.cartRepository = new CartRepository();
  }

  async addToCart(req, res) {
    try {
      const userId = req.userId; // from jwtAuth middleware
      const { productId, quantity } = req.body;
      const cart = await this.cartRepository.addToCart(userId, productId, quantity);
      res.status(200).send({ message: "Product added to cart", cart });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async getCart(req, res) {
    try {
      const userId = req.userId;
      const cart = await this.cartRepository.getCart(userId);
      res.status(200).send(cart);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async updateCartItem(req, res) {
    try {
      const userId = req.userId;
      const { productId, quantity } = req.body;
      const cart = await this.cartRepository.updateCartItem(userId, productId, quantity);
      res.status(200).send(cart);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async removeFromCart(req, res) {
    try {
      const userId = req.userId;
      const { productId } = req.params;
      const cart = await this.cartRepository.removeFromCart(userId, productId);
      res.status(200).send(cart);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async clearCart(req, res) {
    try {
      const userId = req.userId;
      const cart = await this.cartRepository.clearCart(userId);
      res.status(200).send({ message: "Cart cleared", cart });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}
