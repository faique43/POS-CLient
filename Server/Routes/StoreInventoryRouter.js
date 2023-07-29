const express = require("express");
const router = express.Router();

const storeInventoryController = require("../Controllers/StoreInventoryController");

// @route   GET api/storeInventory
// @desc    Get all storeInventory
// @access  Public
router.get("/", storeInventoryController.get_all_inventory);

// @route   GET api/storeInventory/:id
// @desc    Get storeInventory by ID
// @access  Public

router.get("/:id", storeInventoryController.get_inventory_by_id);

// @route   POST api/storeInventory
// @desc    Create a storeInventory
// @access  Private
router.post("/", storeInventoryController.create_inventory);

// @route   PUT api/storeInventory/:id
// @desc    Update an existing inventory item in the database with new data provided as request body
// @access  Private
router.put("/:id", storeInventoryController.update_inventory);

// @route   DELETE api/storeInventory/:id
// @desc    Delete a storeInventory
// @access  Private
router.delete("/:id", storeInventoryController.delete_inventory);

module.exports = router;
