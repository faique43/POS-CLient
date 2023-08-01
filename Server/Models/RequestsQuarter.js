const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestsQuarterSchema = new Schema({
  inventoryItem: {
    type: Schema.Types.ObjectId,
    ref: "quarterProduct",
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

module.exports = RequestsQuarter = mongoose.model(
  "requestsQuarter",
  RequestsQuarterSchema
);
