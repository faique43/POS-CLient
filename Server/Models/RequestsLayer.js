const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestsLayerSchema = new Schema({
  inventoryItem: {
    type: Schema.Types.ObjectId,
    ref: "layerProduct",
    required: true
  },
  quantity: {
    type: Number,
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

module.exports = RequestsLayer = mongoose.model(
  "requestsLayer",
  RequestsLayerSchema
);
