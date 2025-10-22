import express from "express";
import jwtAuth from "../../middleware/jwtAuth.js";
import OrderController from "./order.controller.js";

const orderRouter = express.Router();
const orderController = new OrderController();

router.post("/", jwtAuth, (req, res) => orderController.createOrder(req, res));
router.get("/", jwtAuth, (req, res) => orderController.getOrdersByUser(req, res));
router.get("/:id", jwtAuth, (req, res) => orderController.getOrderById(req, res));

// Admin routes
router.get("/admin/all", jwtAuth, (req, res) => orderController.getAllOrders(req, res));
router.put("/admin/:orderId/status", jwtAuth, (req, res) =>
  orderController.updateOrderStatus(req, res)
);

export default orderRouter;
