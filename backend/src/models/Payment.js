const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
{
    // Order Details
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
        unique: true
    },

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // Payment Information
    amount: {
        type: Number,
        required: true,
        min: 0
    },

    currency: {
        type: String,
        default: "INR"
    },

    paymentMethod: {
        type: String,
        enum: [
            "COD",
            "ONLINE"
        ],
        required: true
    },

    paymentStatus: {
        type: String,
        enum: [
            "PENDING",
            "SUCCESS",
            "FAILED",
            "REFUNDED"
        ],
        default: "PENDING"
    },

    // Razorpay Details (Only for ONLINE)
    razorpayOrderId: {
        type: String,
        default: null
    },

    razorpayPaymentId: {
        type: String,
        default: null
    },

    razorpaySignature: {
        type: String,
        default: null
    },

    // Transaction Details
    transactionId: {
        type: String,
        default: null
    },

    // Failure Details
    failureReason: {
        type: String,
        default: null
    },

    // Refund Details
    refundAmount: {
        type: Number,
        default: 0
    },

    refundReason: {
        type: String,
        default: null
    },

    refundedAt: {
        type: Date,
        default: null
    },

    // Payment Time
    paidAt: {
        type: Date,
        default: null
    }

},
{
    timestamps: true
});

module.exports = mongoose.model(
    "Payment",
    paymentSchema
);