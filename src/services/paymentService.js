const crypto = require("crypto");
const mongoose = require("mongoose");

const razorpay = require("../config/razorpay");
const Payment = require("../models/Payment");
const Cart = require("../models/Cart");
const MenuItem = require("../models/MenuItem");
const Order = require("../models/Order");
const { createOrderFromCart } = require("./orderService");
const { calculatePrice } = require("./priceService");

const createPayment = async (customerId) => {

    const cart = await Cart.findOne({ customerId });

    if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
    }

    const price = calculatePrice(cart.totalAmount);

    const existingPayment = await Payment.findOne({
        customerId,
        paymentStatus: "PENDING",
        expiresAt: {
            $gt: new Date()
        }
    });

    if (existingPayment) {

        return {
            message: "Existing payment found",
            data: {
                paymentId: existingPayment._id,
                razorpayOrderId: existingPayment.razorpayOrderId,
                amount: existingPayment.amount * 100,
                currency: existingPayment.currency,
                key: process.env.RAZORPAY_KEY_ID
            }
        };

    }

    const razorpayOrder = await razorpay.orders.create({
        amount: price.totalAmount * 100,
        currency: "INR",
        receipt: `rcpt_${Date.now()}`
    });

    const payment = await Payment.create({
        customerId,
        amount: price.totalAmount,
        currency: "INR",
        paymentMethod: "ONLINE",
        paymentStatus: "PENDING",
        razorpayOrderId: razorpayOrder.id
    });

    return {
        message: "Proceed to payment",
        data: {
            paymentId: payment._id,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            key: process.env.RAZORPAY_KEY_ID
        }
    };

};

const processSuccessfulPayment = async (
    payment,
    razorpayPaymentId,
    razorpaySignature
) => {

    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        payment.$session(session);

        // Update Payment
        payment.paymentStatus = "SUCCESS";
        payment.razorpayPaymentId = razorpayPaymentId;
        payment.razorpaySignature = razorpaySignature;
        payment.paidAt = new Date();

        await payment.save({ session });

        // Idempotency
        const existingOrder = await Order.findOne({
            paymentId: payment._id
        }).session(session);

        if (existingOrder) {

            await session.commitTransaction();

            return existingOrder;
        }

        // Read Cart
        const cart = await Cart.findOne({
            customerId: payment.customerId
        }).session(session);

        if (!cart || cart.items.length === 0) {
            throw new Error("Cart is empty");
        }

        // Restaurant
        const firstMenuItem = await MenuItem.findById(
            cart.items[0].menuItemId
        ).session(session);

        if (!firstMenuItem) {
            throw new Error("Menu item not found");
        }

        // Create Order
        const order = await createOrderFromCart(
            payment.customerId,
            cart,
            firstMenuItem.restaurantId,
            "ONLINE",
            "SUCCESS",
            payment._id,
            session
        );

        // Link Payment -> Order
        payment.orderId = order._id;

        await payment.save({ session });

        await session.commitTransaction();

        return order;

    } catch (error) {

        await session.abortTransaction();
        throw error;

    } finally {

        session.endSession();

    }

};
/* ==========================================================
   VERIFY PAYMENT
========================================================== */

const verifyPayment = async (
    customerId,
    paymentId,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature
) => {

    // Find Payment
    const payment = await Payment.findById(paymentId);

    if (!payment) {
        throw new Error("Payment not found");
    }

    // Verify Razorpay Order
    if (payment.razorpayOrderId !== razorpayOrderId) {
        throw new Error("Invalid Razorpay Order");
    }

    // Verify Customer
    if (payment.customerId.toString() !== customerId) {
        throw new Error("Unauthorized payment");
    }

    // Check Expiry
    if (payment.expiresAt < new Date()) {

        payment.paymentStatus = "FAILED";
        payment.failureMessage = "Payment expired";

        await payment.save();

        throw new Error("Payment expired");
    }

    // Verify Signature
    const generatedSignature = crypto
        .createHmac(
            "sha256",
            process.env.RAZORPAY_KEY_SECRET
        )
        .update(
            razorpayOrderId + "|" + razorpayPaymentId
        )
        .digest("hex");

    if (generatedSignature !== razorpaySignature) {

        payment.paymentStatus = "FAILED";
        payment.failureMessage = "Invalid payment signature";

        await payment.save();

        throw new Error("Payment verification failed");
    }

    const order = await processSuccessfulPayment(
        payment,
        razorpayPaymentId,
        razorpaySignature
    );

    return {
        message: "Payment verified successfully",
        data: order
    };

};


/* ==========================================================
   RAZORPAY WEBHOOK
========================================================== */

const paymentWebhook = async (
    signature,
    payload
) => {

    // Verify Webhook Signature
    const generatedSignature = crypto
        .createHmac(
            "sha256",
            process.env.RAZORPAY_WEBHOOK_SECRET
        )
        .update(payload)
        .digest("hex");

    if (generatedSignature !== signature) {
        throw new Error("Invalid Webhook Signature");
    }

    // Parse Event
    const event = JSON.parse(
        payload.toString()
    );

    // Ignore Other Events
    if (event.event !== "payment.captured") {

        return {
            message: "Webhook ignored"
        };

    }

    const razorpayPayment =
        event.payload.payment.entity;

    // Find Payment
    const payment = await Payment.findOne({
        razorpayOrderId:
            razorpayPayment.order_id
    });

    if (!payment) {
        throw new Error("Payment not found");
    }

    const order = await processSuccessfulPayment(
        payment,
        razorpayPayment.id,
        signature
    );

    return {
        message: "Webhook processed successfully",
        data: order
    };

};


/* ==========================================================
   EXPORTS
========================================================== */

module.exports = {
    createPayment,
    verifyPayment,
    paymentWebhook
};