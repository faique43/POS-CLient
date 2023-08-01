const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuarterProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  inventoryUsed: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: "quarterinventory"
      },

      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    default: 0,
    required: true
  },
  units: {
    type: String,
    required: true
  }
});

module.exports = QuarterProduct = mongoose.model(
  "quarterProduct",
  QuarterProductSchema
);
