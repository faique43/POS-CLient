const express = require("express");
const router = express.Router();

// import all controllers from categorycontroller
const categoryController = require("../controllers/categoryController");

// @route   GET api/categories
// @desc    Get all categories
// @access  Public
router.get("/", categoryController.getCategories);

// @route   GET api/categories/:id
// @desc    Get category by ID
// @access  Public
router.get("/:id", categoryController.getCategoryById);

// @route   POST api/categories
// @desc    Create a category
// @access  Private
router.post("/", categoryController.createCategory);

// @route   PUT api/categories/:id
// @desc    Update a category
// @access  Private
router.put("/:id", categoryController.updateCategory);

// @route   DELETE api/categories/:id
// @desc    Delete a category
// @access  Private
router.delete("/:id", categoryController.deleteCategory);

// @route   GET api/categories/:id/products
// @desc    Get products by category ID
// @access  Public
router.get("/:id/products", categoryController.getProductsByCategoryId);

module.exports = router;
