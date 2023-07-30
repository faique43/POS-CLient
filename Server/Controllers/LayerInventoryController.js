const LayerInventory = require("../Models/LayerInventory");

// @route   GET api/layerInventory
// @desc    Get all layerInventory
// @access  Public
exports.get_all_inventory = async (req, res) => {
  try {
    const layerInventory = await LayerInventory.find();
    res.json(layerInventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// get all inventory by layer 2 or 3 from body
exports.get_inventory_by_layer = async (req, res) => {
  try {
    const layerInventory = await LayerInventory.find({
      layer: req.body.layer
    });
    res.json(layerInventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   GET api/layerInventory/:id
// @desc    Get layerInventory by ID
// @access  Public
exports.get_inventory_by_id = async (req, res) => {
  try {
    const layerInventory = await LayerInventory.findById(req.params.id);
    if (!layerInventory) {
      return res.status(404).json({ msg: "Layer Inventory not found" });
    }
    res.json(layerInventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
