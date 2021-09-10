const express = require("express");
const authMiddleware = require("../middleware/auth");
const ProductCart = require("../models/cart");

const Order = require("../models/order");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate(["user", "cart"]);

    return res.send({ orders });
  } catch (err) {
    return res.status(400).send({ error: "Error loading orders" });
  }
});

router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate([
      "user",
      "cart",
    ]);

    return res.send({ order });
  } catch (err) {
    return res.status(400).send({ error: "Error loading order" });
  }
});

router.post("/", async (req, res) => {
  const { cart, total_price, payment } = req.body;

  const order = await Order.create({
    user: req.userId,
    total_price,
    payment,
  });

  await Promise.all(
    cart.map(async (product) => {
      const orderCart = new ProductCart({ ...product, order: order._id });
      await orderCart.save();
      order.cart.push(orderCart);
    })
  );

  await order.save();

  return res.send({ order });
});

router.put("/:orderId", async (req, res) => {
  const { cart, total_price, payment } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.orderId,
    {
      total_price,
      payment,
    },
    { new: true }
  );

  order.cart = [];
  await ProductCart.deleteMany({ order: order._id });

  await Promise.all(
    cart.map(async (product) => {
      const orderCart = new ProductCart({ ...product, order: order._id });
      await orderCart.save();
      order.cart.push(orderCart);
    })
  );

  await order.save();

  return res.send({ order });
});

router.delete("/:orderId", async (req, res) => {
  await Order.findByIdAndRemove(req.params.orderId);
  return res.send({ message: "Order deleted" });
});

module.exports = (app) => app.use("/orders", router);
