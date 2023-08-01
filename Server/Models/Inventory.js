const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: "quarterProduct",
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

module.exports = Inventory = mongoose.model("inventory", InventorySchema);
