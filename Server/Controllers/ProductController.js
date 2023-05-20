const { validationResult } = require("express-validator");

const Product = require("../Models/Product");
const Order = require("../Models/Order");

// @route   GET api/products
// @desc    Get all products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   GET api/products/:id
// @desc    Get product by ID
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @route   POST api/products
// @desc    Create a product
// @access  Private
exports.createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, price, description, image, kitchen, inventoryUsed } = req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      description,
      kitchen,
      image,
      inventoryUsed,
    });
    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   PUT api/products/:id
// @desc    Update a product
// @access  Private
exports.updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, price, description, image, stock, inventoryUsed } = req.body;
  const productFields = {};
  if (name) productFields.name = name;
  if (price) productFields.price = price;
  if (description) productFields.description = description;
  if (image) productFields.image = image;
  if (stock) productFields.stock = stock;
  if (inventoryUsed) productFields.inventoryUsed = inventoryUsed;
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   DELETE api/products/:id
// @desc    Delete a product
// @access  Private
exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    await Product.findByIdAndRemove(req.params.id);
    res.json({ msg: "Product removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   GET api/products/:id/orders
// @desc    Get orders by product ID
// @access  Public
exports.getOrdersByProductId = async (req, res) => {
  try {
    const orders = await Order.find({ product: req.params.id }).populate(
      "customer"
    );
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   GET api/products/:kitchen
// @desc    Get products by kitchen
// @access  Public
exports.getProductByKitchen = async (req, res) => {
  try {
    const products = await Product.find({ kitchen: req.params.kitchen });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
