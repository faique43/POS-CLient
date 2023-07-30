const express = require("express");
const router = express.Router();

const layerInventoryController = require("../Controllers/LayerInventoryController");

// @route   GET api/layerInventory
// @desc    Get all layerInventory
// @access  Public
router.get("/", layerInventoryController.get_all_inventory);

// get all inventory by layer 2 or 3 from body
router.get("/layer", layerInventoryController.get_inventory_by_layer);

// @route   GET api/layerInventory/:id
// @desc    Get layerInventory by ID
// @access  Public
router.get("/:id", layerInventoryController.get_inventory_by_id);

module.exports = router;
