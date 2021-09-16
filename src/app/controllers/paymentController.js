const express = require("express");
const payment = require("../middleware/payment");

const router = express.Router();

router.get("/checkout/:id/:email/:description/:amount", payment.checkout);

router.get("/success", (req, res) => {
  return res.render("success_screen");
});

router.get("/pending", (req, res) => {
  return res.render("pending_screen");
});

router.get("/failure", (req, res) => {
  return res.render("failure_screen");
});

module.exports = (app) => app.use("/payments", router);
