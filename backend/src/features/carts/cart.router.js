import express from "express";
import jwtAuth from "../../middleware/jwtAuth.js";
import CartController from "./cart.controller.js";

const cartRouter = express.Router();
const cartController = new CartController();

router.post("/add", jwtAuth, (req, res) => cartController.addToCart(req, res));
router.get("/", jwtAuth, (req, res) => cartController.getCart(req, res));
router.put("/update", jwtAuth, (req, res) => cartController.updateCartItem(req, res));
router.delete("/remove/:productId", jwtAuth, (req, res) => cartController.removeFromCart(req, res));
router.delete("/clear", jwtAuth, (req, res) => cartController.clearCart(req, res));

export default cartRouter;
