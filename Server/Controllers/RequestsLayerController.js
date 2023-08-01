const RequestsLayer = require("../Models/RequestsLayer");
const LayerProduct = require("../Models/LayerProduct");
const quarterInventory = require("../Models/QuarterInventory");

// @route   GET api/requestsLayer
// @desc    Get all requestsLayer
// @access  Public
exports.get_all_requests = async (req, res) => {
  try {
    const requestsLayer = await RequestsLayer.find().populate("item", [
      "name",
      "quantity",
      "units",
      "price",
      "total"
    ]);
    res.json(requestsLayer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route GET api/requestsLayer/:id
// @desc Get requestsLayer by ID
// @access Public
exports.get_requests_by_id = async (req, res) => {
  try {
    const requestsLayer = await RequestsLayer.findById(req.params.id);
    if (!requestsLayer) {
      return res.status(404).json({ msg: "Requests Layer not found" });
    }
    res.json(requestsLayer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route POST api/requestsLayer
// @desc Create a requestsLayer
// @access Public
exports.create_requests = async (req, res) => {
  const { item, quantity } = req.body;

  try {
    const newRequestsLayer = new RequestsLayer({
      item,
      quantity
    });

    const requestsLayer = await newRequestsLayer.save();
    res.json({ requestsLayer, msg: "Request Placed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route PUT api/requestsLayer/:id
// @desc Update a requestsLayer
// @access Public
exports.update_requests = async (req, res) => {
  const { item, quantity } = req.body;

  // Build requestsLayer object
  const requestsLayerFields = {};
  if (item) requestsLayerFields.item = item;
  if (quantity) requestsLayerFields.quantity = quantity;

  try {
    let requestsLayer = await RequestsLayer.findById(req.params.id);

    if (!requestsLayer) {
      return res.status(404).json({ msg: "Requests Layer not found" });
    }

    requestsLayer = await RequestsLayer.findByIdAndUpdate(
      req.params.id,
      { $set: requestsLayerFields },
      { new: true }
    );

    res.json(requestsLayer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route DELETE api/requestsLayer/:id
// @desc Delete a requestsLayer
// @access Public
exports.delete_requests = async (req, res) => {
  try {
    let requestsLayer = await RequestsLayer.findById(req.params.id);

    if (!requestsLayer) {
      return res.status(404).json({ msg: "Requests Layer not found" });
    }

    await RequestsLayer.findByIdAndRemove(req.params.id);

    res.json({ msg: "Requests Layer removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.approve_requests = async (req, res) => {
  try {
    let requestlayer = await RequestsLayer.findById(req.params.id);
    if (!requestlayer) {
      return res.status(404).json({ msg: "Request Layer not found" });
    }
    let layerproduct = await LayerProduct.findById(requestlayer.item);
    if (!layerproduct) {
      return res.status(404).json({ msg: "Layer Product not found" });
    }
    let quarterinventory = await quarterInventory.findById(layerproduct.item);
    if (!quarterinventory) {
      // make one
      const newQuarterInventory = new quarterInventory({
        item: layerproduct.id,
        quantity: requestlayer.quantity,
        units: layerproduct.units,
        price: layerproduct.price * requestlayer.quantity
      });
      const quarterinventory = await newQuarterInventory.save();
    } else {
      // update
      quarterinventory.quantity += requestlayer.quantity;
      quarterinventory.price += layerproduct.price * requestlayer.quantity;
      await quarterinventory.save();
    }
    // update the status of request
    requestlayer.status = "Approved";
    await requestlayer.save();
    res.json({ msg: "Request Approved" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};