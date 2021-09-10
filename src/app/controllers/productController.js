const express = require("express");
const Product = require("../models/product");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    return res.send({ products });
  } catch (err) {
    return res.status(400).send({ error: "Error loading products" });
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    return res.send({ product });
  } catch (err) {
    return res.status(400).send({ error: "Error loading product" });
  }
});

router.post("/", async (req, res) => {
  const product = await Product.create(req.body);
  return res.send({ product });
});

router.put("/:productId", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.productId, {
    ...req.body,
    new: true,
  });

  return res.send({ product });
});

router.delete("/:productId", async (req, res) => {
  await Product.findByIdAndRemove(req.params.productId);
  return res.send({ message: "Product deleted" });
});

module.exports = (app) => app.use("/products", router);
