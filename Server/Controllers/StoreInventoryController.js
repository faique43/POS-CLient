const StoreInventory = require("../Models/StoreInventory");
const RequestsStore = require("../Models/RequestsStore");
const LayerInventory = require("../Models/LayerInventory");

// @route GET api/storeInventory
// @desc Get all storeInventory
// @access Public
exports.get_all_inventory = async (req, res) => {
  try {
    const storeInventory = await StoreInventory.find();
    res.json(storeInventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route GET api/storeInventory/:id
// @desc Get storeInventory by ID
// @access Public
exports.get_inventory_by_id = async (req, res) => {
  try {
    const storeInventory = await StoreInventory.findById(req.params.id);
    if (!storeInventory) {
      return res.status(404).json({ msg: "Store Inventory not found" });
    }
    res.json(storeInventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route POST api/storeInventory
// @desc Create a storeInventory
// @access Private
exports.create_inventory = async (req, res) => {
  const { name, quantity, units, price, total } = req.body;
  try {
    const newStoreInventory = new StoreInventory({
      name,
      quantity,
      units,
      price,
      total
    });
    const storeInventory = await newStoreInventory.save();
    res.json(storeInventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route PUT api/storeInventory/:id
// @desc Update a storeInventory
// @access Private
exports.update_inventory = async (req, res) => {
  const { name, quantity, units, price, total } = req.body;
  const inventoryFields = {};
  if (name) inventoryFields.name = name;
  if (quantity) inventoryFields.quantity = quantity;
  if (units) inventoryFields.units = units;
  if (price) inventoryFields.price = price;
  if (total) inventoryFields.total = total;
  try {
    let storeInventory = await StoreInventory.findById(req.params.id);
    if (!storeInventory) {
      return res.status(404).json({ msg: "Store Inventory not found" });
    }
    storeInventory = await StoreInventory.findByIdAndUpdate(
      req.params.id,
      { $set: inventoryFields },
      { new: true }
    );
    res.json(storeInventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route DELETE api/storeInventory/:id
// @desc Delete a storeInventory
// @access Private
exports.delete_inventory = async (req, res) => {
  try {
    let storeInventory = await StoreInventory.findById(req.params.id);
    if (!storeInventory) {
      return res.status(404).json({ msg: "Store Inventory not found" });
    }
    await StoreInventory.findByIdAndRemove(req.params.id);
    res.json({ msg: "Store Inventory removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route DELETE api/storeInventory/
// @desc Delete all storeInventory
// @access Private
exports.delete_all_inventory = async (req, res) => {
  try {
    await StoreInventory.deleteMany({});
    res.json({ msg: "All Store Inventory removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
