const { validationResult } = require("express-validator");

const Order = require("../models/Order");
const Product = require("../models/Product");
const Inventory = require("../Models/Inventory");

// @route   GET api/orders
// @desc    Get all orders
// @access  Public
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.product");
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
    const order = await Order.findById(req.params.id).populate(
      "products.product"
    );
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

  const { name, products } = req.body;

  try {
    // Calculate total price of the order
    let totalPrice = 0;
    for (const { product, quantity } of products) {
      const productObj = await Product.findById(product);
      if (!productObj) {
        return res.status(404).json({ msg: "Product not found" });
      }
      totalPrice += productObj.price * quantity;
    }

    const inventoryUsed = [];
    for (const { product, quantity } of products) {
      const productObj = await Product.findById(product);
      if (!productObj) {
        return res.status(404).json({ msg: "Product not found" });
      }
      for (const { item, quantity: itemQuantity } of productObj.inventoryUsed) {
        const inventoryItem = await Inventory.findById(item);
        if (!inventoryItem) {
          return res.status(404).json({ msg: "Inventory item not found" });
        }
        if (itemQuantity < quantity * itemQuantity) {
          return res.status(404).json({ msg: "Not enough inventory" });
        }
        inventoryUsed.push({
          id: inventoryItem._id,
          quantity: quantity * itemQuantity,
        });
      }
    }

    // Update inventory quantities
    for (const { id, quantity } of inventoryUsed) {
      const inventoryItem = await Inventory.findById(id);
      if (!inventoryItem) {
        return res.status(404).json({ msg: "Inventory item not found" });
      }
      inventoryItem.quantity -= quantity;
      await inventoryItem.save();
    }

    // Create a new order object
    const order = new Order({
      name,
      products,
      totalPrice,
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
  const { products, status } = req.body;
  const orderFields = {};
  if (products) {
    orderFields.products = products.map((product) => ({
      product: product.id,
      quantity: product.quantity,
    }));
  }
  if (status) orderFields.status = status;
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

// @route   POST api/orders/:id/complete
// @desc    Complete an order
// @access  Private
exports.completeOrder = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: "Order not found" });
    order.status = "Completed";
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route GET api/orders/kitchen/:kitchen
// @desc Get all orders for a kitchen
// @access Private
exports.getOrdersByKitchen = async (req, res) => {
  try {
    const kitchen = req.params.kitchen;
    const orders = await Order.find().populate("products.product", [
      "name",
      "price",
      "description",
      "kitchen",
      "image",
    ]);
    const filteredOrders = orders.filter((order) => {
      const products = order.products.filter((product) => {
        return product.product.kitchen === kitchen;
      });
      return products.length > 0;
    });
    res.json(filteredOrders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
