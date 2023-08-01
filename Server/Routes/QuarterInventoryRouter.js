const express = require("express");
const router = express.Router();

const quarterInventoryController = require("../Controllers/QuarterInventoryController");

router.get("/", quarterInventoryController.get_all_quarterinventory);

router.get("/:id", quarterInventoryController.get_by_id);

module.exports = router;
