const Inventory = require("../Models/Inventory");

// @route GET api/inventory
// @desc Get all inventory
// @access Public
exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route GET api/inventory/:id
// @desc Get inventory by ID
// @access Public
exports.getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) {
      return res.status(404).json({ msg: "Inventory not found" });
    }
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route POST api/inventory
// @desc Create an inventory
// @access Private
exports.createInventory = async (req, res) => {
  const { item, quantity, price } = req.body;
  try {
    const newInventory = new Inventory({
      item,
      price,
      quantity,
    });
    const inventory = await newInventory.save();
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateInventoryById = async (req, res) => {
  const { item, quantity, price } = req.body;
  try {
    const newInventory = new Inventory({
      item,
      price,
      quantity,
    });
    const inventory = await newInventory.save();
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
