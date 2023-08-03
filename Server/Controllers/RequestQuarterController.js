const RequestsQuarter = require("../Models/RequestsQuarter");
const QuarterProduct = require("../Models/QuarterProduct");
const Inventory = require("../Models/Inventory");
const QuarterInventory = require("../Models/QuarterInventory");

// @route   GET api/requestsquarter
// @desc    Get all requests quarter
// @access  Public
exports.get_all_requests = async (req, res) => {
  try {
    const requestsQuarter = await RequestsQuarter.find().populate("item", [
      "name",
      "quantity",
      "units",
      "price",
      "total"
    ]);
    res.json(requestsQuarter);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route GET api/requestsquarter/:id
// @desc Get requestsquarter by ID
// @access Public
exports.get_requests_by_id = async (req, res) => {
  try {
    const requestsQuarter = await RequestsQuarter.findById(req.params.id);
    if (!requestsQuarter) {
      return res.status(404).json({ msg: "Requests Quarter not found" });
    }
    res.json(requestsQuarter);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route POST api/requestsquarter
// @desc Create a requestsquarter
// @access Public
exports.create_requests = async (req, res) => {
  const { item, quantity } = req.body;

  try {
    const newRequestsQuarter = new RequestsQuarter({
      item,
      quantity
    });
    const quarterInventory = await QuarterProduct.findById(item);

    if (quantity > quarterInventory.quantity) {
      return res.status(404).json({ msg: "Not enough items in inventory" });
    }
    const requestsQuarter = await newRequestsQuarter.save();
    res.json({ requestsQuarter, msg: "Request Placed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route PUT api/requestsquarter/:id
// @desc Update a requestsquarter
// @access Public
exports.update_requests = async (req, res) => {
  const { item, quantity } = req.body;

  // Build requestsquarter object
  const requestsQuarterFields = {};
  if (item) requestsQuarterFields.item = item;
  if (quantity) requestsQuarterFields.quantity = quantity;

  try {
    let requestsQuarter = await RequestsQuarter.findById(req.params.id);

    if (!requestsQuarter)
      return res.status(404).json({ msg: "Requests Quarter not found" });

    requestsQuarter = await RequestsQuarter.findByIdAndUpdate(
      req.params.id,
      { $set: requestsQuarterFields },
      { new: true }
    );

    res.json(requestsQuarter);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route DELETE api/requestsquarter/:id
// @desc Delete a requestsquarter
// @access Public
exports.delete_requests = async (req, res) => {
  try {
    let requestsQuarter = await RequestsQuarter.findById(req.params.id);

    if (!requestsQuarter)
      return res.status(404).json({ msg: "Requests Quarter not found" });

    await RequestsQuarter.findByIdAndRemove(req.params.id);

    res.json({ msg: "Requests Quarter removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.approve_requests = async (req, res) => {
  try {
    let requestsQuarter = await RequestsQuarter.findById(req.params.id);

    if (!requestsQuarter)
      return res.status(404).json({ msg: "Requests Quarter not found" });

    let quarterproduct = await QuarterProduct.findById(requestsQuarter.id);
    if (!quarterproduct) {
      return res.status(404).json({ msg: "Quarter Product not found" });
    }
    let inventory = await Inventory.find({ item: quarterproduct.id });
    if (!inventory) {
      // make one
      inventory = new Inventory({
        item: quarterproduct.id,
        quantity: 0,
        units: quarterproduct.units,
        price: 0
      });
      inventory = await inventory.save();
    }
    // update
    quarterproduct.quantity =
      quarterproduct.quantity - requestsQuarter.quantity;
    inventory.quantity += requestsQuarter.quantity;
    inventory.price += quarterproduct.price;
    await quarterproduct.save();
    await inventory.save();

    // update the status of request
    requestsQuarter.status = "Approved";
    await requestsQuarter.save();
    res.json({ msg: "Request Approved" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
