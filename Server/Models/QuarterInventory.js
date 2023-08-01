const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuarterInventorySchema = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: "layerProduct",
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
  }
});

module.exports = QuarterInventory = mongoose.model(
  "quarterInventory",
  QuarterInventorySchema
);
