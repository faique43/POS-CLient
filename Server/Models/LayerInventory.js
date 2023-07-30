const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LayerInventorySchema = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: "storeInventory" || "layerInventory",
    required: true
  },
  layer: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  units: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

module.exports = LayerInventory = mongoose.model(
  "layerInventory",
  LayerInventorySchema
);
