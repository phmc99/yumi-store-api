const mongoose = require("../../database/index");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },

  total_price: {
    type: String,
    require: true,
  },
  payment: {
    type: Object,
    require: true,
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCart",
      require: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
