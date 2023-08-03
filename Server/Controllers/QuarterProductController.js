const QuarterProduct = require("../Models/QuarterProduct");
const QuarterInventory = require("../Models/QuarterInventory");

// @route   GET api/quarterproduct
// @desc    Get all quarter products
// @access  Private

exports.getQuarterProducts = (req, res) => {
  try {
    QuarterProduct.find()
      .populate({
        path: "inventoryUsed.item",
        populate: {
          path: "item"
        }
      })
      .then((quarterproducts) => res.json(quarterproducts));
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// @route   POST api/quarterproduct
// @desc    Create a quarter product
// @access  Private
exports.createQuarterProduct = (req, res) => {
  try {
    const newQuarterProduct = new QuarterProduct({
      name: req.body.name,
      inventoryUsed: req.body.inventoryUsed,
      price: req.body.price,
      quantity: req.body.quantity,
      units: req.body.units
    });

    // change the quantity of quarter inventory
    req.body.inventoryUsed.forEach((item) => {
      QuarterInventory.findById(item.item).then((quarterinventory) => {
        quarterinventory.quantity -= item.quantity;
        // if the quarter inventory becomes less than 0 dont allow
        if (quarterinventory.quantity < 0) {
          res.status(400).json({
            msg: "Not enough quantity of " + quarterinventory.item.name
          });
        }
        quarterinventory.save();
      });
    });

    newQuarterProduct.save().then((quarterproduct) => res.json(quarterproduct));
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// @route   DELETE api/quarterproduct/:id
// @desc    Delete a quarter product
// @access  Private
exports.deleteQuarterProduct = (req, res) => {
  try {
    QuarterProduct.findById(req.params.id)
      .then((quarterproduct) =>
        quarterproduct.remove().then(() => res.json({ success: true }))
      )
      .catch((err) => res.status(404).json({ success: false }));
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// @route   PUT api/quarterproduct/:id
// @desc    Update a quarter product
// @access  Private
exports.updateQuarterProduct = (req, res) => {
  try {
    QuarterProduct.findById(req.params.id)
      .then((quarterproduct) => {
        quarterproduct.name = req.body.name;
        quarterproduct.inventoryUsed = req.body.inventoryUsed;
        quarterproduct.price = req.body.price;
        quarterproduct.quantity = req.body.quantity;
        quarterproduct.units = req.body.units;

        // change the quantity of quarter inventory
        req.body.inventoryUsed.forEach((item) => {
          QuarterInventory.findById(item.item).then((quarterinventory) => {
            quarterinventory.quantity -= item.quantity;
            quarterinventory.save();
          });
        });

        quarterproduct
          .save()
          .then((quarterproduct) => res.json(quarterproduct));
      })
      .catch((err) => res.status(404).json({ success: false }));
  } catch (err) {
    res.status(500).send("Server error");
  }
};
