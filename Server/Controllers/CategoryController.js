const Category = require("../models/Category");
const Product = require("../models/Product");
const { validationResult } = require("express-validator");

// @route   GET api/categories
// @desc    Get all categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   GET api/categories/:id
// @desc    Get category by ID
// @access  Public
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   POST api/categories
// @desc    Create a category
// @access  Private
exports.createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name } = req.body;
  try {
    const newCategory = new Category({
      name,
    });
    const category = await newCategory.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   PUT api/categories/:id
// @desc    Update a category
// @access  Private
exports.updateCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name } = req.body;
  const categoryFields = {};
  if (name) categoryFields.name = name;
  try {
    let category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ msg: "Category not found" });
    category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: categoryFields },
      { new: true }
    );
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   DELETE api/categories/:id
// @desc    Delete a category
// @access  Private
exports.deleteCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ msg: "Category not found" });
    await Category.findByIdAndRemove(req.params.id);
    res.json({ msg: "Category removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   GET api/categories/:id/products
// @desc    Get products by category ID
// @access  Public
exports.getProductsByCategoryId = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.id });
    if (!products) return res.status(404).json({ msg: "Products not found" });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
