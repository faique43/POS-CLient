const RequestsStore = require("../Models/RequestsStore");
const StoreInventory = require("../Models/StoreInventory");
const LayerInventory = require("../Models/LayerInventory");

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

// get requests by layer
exports.get_requests_by_layer = async (req, res) => {
  try {
    const requestsStore = await RequestsStore.find({
      layer: req.body.layer
    }).populate("inventoryItem", [
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
  const { inventoryItem, quantity, layer } = req.body;
  try {
    const newRequestsStore = new RequestsStore({
      inventoryItem,
      quantity
    });
    const requestsStore = await newRequestsStore.save();
    res.json({ requestsStore, msg: "Request Placed" });
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

// Api to approve requests
exports.approve_requests = async (req, res) => {
  try {
    let requestsStore = await RequestsStore.findById(req.params.id);
    if (!requestsStore) {
      return res.status(404).json({ msg: "Requests Store not found" });
    }
    let storeInventory = await StoreInventory.findById(
      requestsStore.inventoryItem
    );
    if (!storeInventory) {
      return res.status(404).json({ msg: "Store Inventory not found" });
    }
    let layerInventory = await LayerInventory.findById(
      requestsStore.inventoryItem
    );
    if (!layerInventory) {
      // if no layer inventory then make one
      layerInventory = new LayerInventory({
        item: requestsStore.inventoryItem,
        quantity: requestsStore.quantity,
        units: storeInventory.units,
        price: storeInventory.price * requestsStore.quantity
      });
      await layerInventory.save();
    }
    if (requestsStore.quantity > storeInventory.quantity) {
      return res.status(404).json({ msg: "Not enough items in inventory" });
    }
    storeInventory.quantity = storeInventory.quantity - requestsStore.quantity;
    // update price
    storeInventory.price = storeInventory.price * storeInventory.quantity;
    layerInventory.quantity = layerInventory.quantity + requestsStore.quantity;
    // update price
    layerInventory.price = layerInventory.price * layerInventory.quantity;
    await storeInventory.save();
    await layerInventory.save();
    // update request's status
    requestsStore.status = "Approved";
    await requestsStore.save();
    res.json({ msg: "Request Approved" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
