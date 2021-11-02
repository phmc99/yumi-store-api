const payment = require("../middleware/payment");

class PaymentControllers {
  static payment() {
    return payment.checkout;
  }

  static successPayment(res) {
    return res.render("success_screen");
  }

  static pendingPayment(res) {
    return res.render("pending_screen");
  }

  static failurePayment(res) {
    return res.render("failure_screen");
  }
}

module.exports = PaymentControllers;
