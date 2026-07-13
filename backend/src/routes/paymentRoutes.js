const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validate = require("../middleware/validate");

const paymentValidation = require("../validations/payment/payment.request");

router.post("/create",authMiddleware,roleMiddleware("CUSTOMER"),validate(paymentValidation.createPaymentSchema),paymentController.createPayment);
router.post("/verify",authMiddleware,roleMiddleware("CUSTOMER"),validate(paymentValidation.verifyPaymentSchema),paymentController.verifyPayment);

router.post("/webhook",paymentController.paymentWebhook);

module.exports = router;