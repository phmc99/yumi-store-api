const { Router } = require("express");
const PaymentControllers = require("../controllers/payment");
const authMiddleware = require("../middleware/auth");

const router = Router();

router.use(authMiddleware);

router.get(
  "/checkout/:id/:email/:description/:amount",
  PaymentControllers.payment()
);

router.get("/success", (req, res) => PaymentControllers.successPayment(res));

router.get("/pending", (req, res) => PaymentControllers.pendingPayment(res));

router.get("/failure", (req, res) => PaymentControllers.failurePayment(res));

module.exports = router;
