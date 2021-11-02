const { Router } = require("express");
const OrderControllers = require("../controllers/order");
const authMiddleware = require("../middleware/auth");

const router = Router();

router.use(authMiddleware);

router.get("/", (req, res) => OrderControllers.getAll(req, res));

router.get("/:orderId", (req, res) => OrderControllers.getOne(req, res));

router.post("/", (req, res) => OrderControllers.createOrder(req, res));

router.put("/:orderId", (req, res) => OrderControllers.updateOrder(req, res));

router.delete("/:orderId", (req, res) =>
  OrderControllers.deleteOrder(req, res)
);

module.exports = router;
