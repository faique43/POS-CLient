const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestsStoreSchema = new Schema({
  inventoryItem: {
    type: Schema.Types.ObjectId,
    ref: "storeInventory",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  layer: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Pending"
  },
  dateRequested: {
    type: Date,
    default: Date.now
  }
});

module.exports = RequestsStore = mongoose.model(
  "requestsStore",
  RequestsStoreSchema
);
