const { validationResult } = require("express-validator");

const Order = require("../models/Order");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Customer = require("../Models/Customer");

// @route   GET api/orders
// @desc    Get all orders
// @access  Public
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("product");
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   GET api/orders/:id
// @desc    Get order by ID
// @access  Public
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("product");
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   POST api/orders
// @desc    Create an order
// @access  Private
exports.createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { product, customer, quantity } = req.body;
  try {
    const newOrder = new Order({
      product,
      customer,
      quantity,
    });
    const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   PUT api/orders/:id
// @desc    Update an order
// @access  Private
exports.updateOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { product, customer, quantity } = req.body;
  const orderFields = {};
  if (product) orderFields.product = product;
  if (customer) orderFields.customer = customer;
  if (quantity) orderFields.quantity = quantity;
  try {
    let order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: "Order not found" });
    order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: orderFields },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   DELETE api/orders/:id
// @desc    Delete an order
// @access  Private
exports.deleteOrder = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: "Order not found" });
    await Order.findByIdAndRemove(req.params.id);
    res.json({ msg: "Order removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
