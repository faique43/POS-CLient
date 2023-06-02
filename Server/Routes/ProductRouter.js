const express = require("express");
const router = express.Router();

// import all Controllers from ProductController
const ProductController = require("../Controllers/ProductController");

const upload = require("../Middlewares/Upload");

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get("/", ProductController.getProducts);

// @route   GET api/products/:id
// @desc    Get product by ID
// @access  Public
router.get("/:id", ProductController.getProductById);

// @route   POST api/products
// @desc    Create a product
// @access  Private
router.post("/", upload.single("image"), ProductController.createProduct);

// @route   PUT api/products/:id
// @desc    Update a product
// @access  Private
router.put("/:id", ProductController.updateProduct);

// @route   DELETE api/products/:id
// @desc    Delete a product
// @access  Private
router.delete("/:id", ProductController.deleteProduct);

// @route   GET api/products/kitchen/:kitchen
// @desc    Get products by kitchen
// @access  Public
router.get("/kitchen/:kitchen", ProductController.getProductByKitchen);

module.exports = router;
