const mongoose = require("../../database/index");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: Number,
    required: true,
  },
  specie: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  member_price: {
    type: String,
    required: true,
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
