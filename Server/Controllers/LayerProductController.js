const LayerProduct = require("../Models/LayerProduct");
const LayerInventory = require("../Models/LayerInventory");

// @route   GET api/layerproduct
// @desc    Get all layer products
// @access  Private
exports.getLayerProducts = (req, res) => {
  try {
    LayerProduct.find()
      .populate("inventoryUsed.item", "name quantity units")
      .then((layerproducts) => res.json(layerproducts));
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// @route   POST api/layerproduct
// @desc    Create a layer product
// @access  Private
exports.createLayerProduct = (req, res) => {
  try {
    const newLayerProduct = new LayerProduct({
      name: req.body.name,
      inventoryUsed: req.body.inventoryUsed,
      price: req.body.price,
      quantity: req.body.quantity,
      units: req.body.units
    });

    // change the quantity of layer inventory
    req.body.inventoryUsed.forEach((item) => {
      LayerInventory.findById(item.item).then((layerinventory) => {
        layerinventory.quantity -= item.quantity;
        layerinventory.save();
      });
    });

    newLayerProduct.save().then((layerproduct) => res.json(layerproduct));
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// @route   DELETE api/layerproduct/:id
// @desc    Delete a layer product
// @access  Private
exports.deleteLayerProduct = (req, res) => {
  try {
    LayerProduct.findById(req.params.id)
      .then((layerproduct) =>
        layerproduct.remove().then(() => res.json({ success: true }))
      )
      .catch((err) => res.status(404).json({ success: false }));
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// @route   PUT api/layerproduct/:id
// @desc    Update a layer product
// @access  Private
exports.updateLayerProduct = (req, res) => {
  try {
    LayerProduct.findById(req.params.id)
      .then((layerproduct) => {
        layerproduct.name = req.body.name;
        layerproduct.inventoryUsed = req.body.inventoryUsed;
        layerproduct.price = req.body.price;
        layerproduct.quantity = req.body.quantity;
        layerproduct.units = req.body.units;

        layerproduct
          .save()
          .then(() => res.json({ success: true }))
          .catch((err) => res.status(404).json({ success: false }));
      })
      .catch((err) => res.status(404).json({ success: false }));
  } catch (err) {
    res.status(500).send("Server error");
  }
};
