const RequestsStore = require("../Models/RequestsStore");
const StoreInventory = require("../Models/StoreInventory");

// @route GET api/requestsStore
// @desc Get all requestsStore
// @access Public
exports.get_all_requests = async (req, res) => {
  try {
    const requestsStore = await RequestsStore.find().populate("inventoryItem", [
      "name",
      "quantity",
      "units",
      "price",
      "total"
    ]);
    res.json(requestsStore);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route GET api/requestsStore/:id
// @desc Get requestsStore by ID
// @access Public
exports.get_requests_by_id = async (req, res) => {
  try {
    const requestsStore = await RequestsStore.findById(req.params.id);
    if (!requestsStore) {
      return res.status(404).json({ msg: "Requests Store not found" });
    }
    res.json(requestsStore);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route POST api/requestsStore
// @desc Create a requestsStore
// @access Private
// make a controller that requests from the items in StoreInventory Collection

exports.create_requests = async (req, res) => {
  const { inventoryItem, quantity } = req.body;
  try {
    const newRequestsStore = new RequestsStore({
      inventoryItem,
      quantity
    });
    const requestsStore = await newRequestsStore.save();
    res.json(requestsStore);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route PUT api/requestsStore/:id
// @desc Update a requestsStore
// @access Private
exports.update_requests = async (req, res) => {
  const { inventoryItem, quantity } = req.body;
  const requestsFields = {};
  if (inventoryItem) requestsFields.inventoryItem = inventoryItem;
  if (quantity) requestsFields.quantity = quantity;
  try {
    let requestsStore = await RequestsStore.findById(req.params.id);
    if (!requestsStore) {
      return res.status(404).json({ msg: "Requests Store not found" });
    }
    requestsStore = await RequestsStore.findByIdAndUpdate(
      req.params.id,
      { $set: requestsFields },
      { new: true }
    );
    res.json(requestsStore);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route DELETE api/requestsStore/:id
// @desc Delete a requestsStore
// @access Private
exports.delete_requests = async (req, res) => {
  try {
    let requestsStore = await RequestsStore.findById(req.params.id);
    if (!requestsStore) {
      return res.status(404).json({ msg: "Requests Store not found" });
    }
    await RequestsStore.findByIdAndRemove(req.params.id);
    res.json({ msg: "Requests Store removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
