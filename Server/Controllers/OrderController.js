const { validationResult } = require("express-validator");

const Order = require("../models/Order");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Inventory = require("../Models/Inventory");

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
  try {
    const { name, products, totalPrice } = req.body;

    // Calculate inventory used in products
    const inventoryUsed = {};
    for (const { product, quantity } of products) {
      const productObj = await Product.findById(product);
      for (const { item, quantity: itemQuantity } of productObj.inventoryUsed) {
        inventoryUsed[item] =
          (inventoryUsed[item] || 0) + quantity * itemQuantity;
      }
    }

    // Update inventory quantities
    for (const item in inventoryUsed) {
      const inventoryItem = await Inventory.findOne({ item });
      inventoryItem.quantity -= inventoryUsed[item];
      await inventoryItem.save();
    }

    // Create a new order object
    const order = new Order({
      name,
      products,
      totalPrice,
      inventoryUsed,
    });

    // Save the new order to the database
    await order.save();

    res.status(201).json(order);
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
  const { product, quantity } = req.body;
  const orderFields = {};
  if (product) orderFields.product = product;
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
