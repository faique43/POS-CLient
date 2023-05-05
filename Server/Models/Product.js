const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
  kitchen: {
    type: String,
    enum: ["1", "2"],
    required: true,
  },
  inventoryUsed: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: "inventory",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Product = mongoose.model("product", ProductSchema);
