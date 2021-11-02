const Product = require("../models/product");
const Helpers = require("./helpers");

class ProductControllers {
  static async getAll(req, res) {
    try {
      const { page, perPage } = req.query;
      const products = await Product.find();

      return res.json(Helpers.paginateData(products, page, perPage));
    } catch (err) {
      return res.status(400).json({ error: "Error loading products" });
    }
  }

  static async getOne(req, res) {
    try {
      const product = await Product.findById(req.params.productId);

      return res.json({ product });
    } catch (err) {
      return res.status(400).json({ error: "Error loading product" });
    }
  }

  static async createProduct(req, res) {
    try {
      const product = await Product.create(req.body);

      return res.status(201).json({ product });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  static async updateProduct(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.productId, {
        ...req.body,
        new: true,
      });

      return res.status(202).json({ product });
    } catch (err) {
      return res.status(400).json({ error: "Error changing product" });
    }
  }

  static async deleteProduct(req, res) {
    try {
      await Product.findByIdAndRemove(req.params.productId);
      return res.status(204).json({ message: "Product deleted" });
    } catch (err) {
      return res.status(400).json({ error: "Error deleting product" });
    }
  }
}

module.exports = ProductControllers;
