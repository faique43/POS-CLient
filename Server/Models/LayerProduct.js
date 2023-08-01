const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LayerProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  inventoryUsed: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: "layerInventory"
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

module.exports = LayerProduct = mongoose.model(
  "layerProduct",
  LayerProductSchema
);
