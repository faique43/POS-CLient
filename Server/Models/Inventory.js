const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  item: {
    type: String,
    requied: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    requied: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Inventory = mongoose.model("inventory", InventorySchema);
