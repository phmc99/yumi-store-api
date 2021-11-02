const { Router } = require("express");
const ProductControllers = require("../controllers/product");

const router = Router();

router.get("/", (req, res) => ProductControllers.getAll(req, res));

router.get("/:productId", (req, res) => ProductControllers.getOne(req, res));

router.post("/", (req, res) => ProductControllers.createProduct(req, res));

router.put("/:productId", (req, res) =>
  ProductControllers.updateProduct(req, res)
);

router.delete("/:productId", (req, res) =>
  ProductControllers.deleteProduct(req, res)
);

module.exports = router;
