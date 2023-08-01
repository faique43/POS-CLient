const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreInventorySchema = new Schema({
  name: {
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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = StoreInventory = mongoose.model(
  "storeInventory",
  StoreInventorySchema
);
