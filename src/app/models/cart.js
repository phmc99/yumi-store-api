const mongoose = require("../../database/index");

const ProductCartSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

module.exports = ProductCart;
