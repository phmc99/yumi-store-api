const mongoose = require("../../database/index");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  category: {
    type: Number,
    require: true,
  },
  specie: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  member_price: {
    type: String,
    require: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
  rating: {
    type: Object,
    required: true,
  },
  image_url: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
