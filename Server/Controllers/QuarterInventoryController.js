const QuarterInventory = require("../Models/QuarterInventory");

// @route   GET api/quarterinventory
// @desc    Get all quarter inventory
// @access  Public
exports.get_all_quarterinventory("/", async (req, res) => {
  QuarterInventory.find()
    .sort({ date: -1 })
    .then((quarterinventory) => res.json(quarterinventory))
    .catch((err) =>
      res
        .status(404)
        .json({ noquarterinventoryfound: "No Quarter Inventory found" })
    );
});

// @route   GET api/quarterinventory/:id
// @desc    Get quarter inventory by id
// @access  Public
exports.get_by_id("/:id", async (req, res) => {
  QuarterInventory.findById(req.params.id)
    .then((quarterinventory) => res.json(quarterinventory))
    .catch((err) =>
      res.status(404).json({
        noquarterinventoryfound: "No Quarter Inventory found with that ID"
      })
    );
});
