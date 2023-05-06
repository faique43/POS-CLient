const express = require("express");
const router = express.Router();

const orderConroller = require("../Controllers/OrderController");

// @route   GET api/orders
// @desc    Get all orders
// @access  Public
router.get("/", orderConroller.getOrders);

// @route   GET api/orders/:id
// @desc    Get order by ID
// @access  Public
router.get("/:id", orderConroller.getOrderById);

// @route   POST api/orders
// @desc    Create an order
// @access  Private
router.post("/", orderConroller.createOrder);

// @route   PUT api/orders/:id
// @desc    Update an order
// @access  Private
router.put("/:id", orderConroller.updateOrder);

// @route   DELETE api/orders/:id
// @desc    Delete an order
// @access  Private
router.delete("/:id", orderConroller.deleteOrder);

// @route   POST api/orders/:id/complete
// @desc    Complete an order
// @access  Private
router.post("/:id/complete", orderConroller.completeOrder);

// @route GET api/orders/kitchen/:kitchen
// @desc Get all orders for a kitchen
// @access Private
router.get("/kitchen/:kitchen", orderConroller.getOrdersByKitchen);

module.exports = router;
