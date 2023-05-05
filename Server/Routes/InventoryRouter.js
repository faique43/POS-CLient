const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventoryController");

// @route   GET api/inventory
// @desc    Get all inventory
// @access  Public
router.get("/", inventoryController.getInventory);

// @route   GET api/inventory/:id
// @desc    Get inventory by ID
// @access  Public
router.get("/:id", inventoryController.getInventoryById);

// @route   POST api/inventory
// @desc    Create an inventory
// @access  Private
router.post("/", inventoryController.createInventory);

// @route   PUT api/inventory/:id
// @desc    Update an inventory
// @access  Private
router.put("/:id", inventoryController.updateInventoryById);

module.exports = router;
