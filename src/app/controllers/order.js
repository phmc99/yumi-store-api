const ProductCart = require("../models/cart");
const Order = require("../models/order");
const Helpers = require("./helpers");

class OrderControllers {
  static async getAll(req, res) {
    try {
      const { page, perPage } = req.query;
      const orders = await Order.find().populate(["user", "cart"]);

      return res.json(Helpers.paginateData(orders, page, perPage));
    } catch (err) {
      return res.status(400).json({ error: "Error loading orders" });
    }
  }

  static async getOne(req, res) {
    try {
      const order = await Order.findById(req.params.orderId).populate([
        "user",
        "cart",
      ]);

      return res.json({ order });
    } catch (err) {
      return res.status(400).json({ error: "Error loading order" });
    }
  }

  static async createOrder(req, res) {
    try {
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

      return res.status(201).json({ order });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  static async updateOrder(req, res) {
    try {
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

      return res.status(202).json({ order });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  static async deleteOrder(req, res) {
    try {
      await Order.findByIdAndRemove(req.params.orderId);
      return res.status(204).json({ message: "Order deleted" });
    } catch (err) {
      return res.status(400).json({ error: "Error deleting order" });
    }
  }
}

module.exports = OrderControllers;
