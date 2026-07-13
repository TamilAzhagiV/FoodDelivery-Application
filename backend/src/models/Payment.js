const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
{
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        default: null
    },

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

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

  
    failureMessage: {
        type: String,
        default: null
    },

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

    paidAt: {
        type: Date,
        default: null
    },
    expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 15 * 60 * 1000)
}

},
{
    timestamps: true
});

module.exports = mongoose.model(
    "Payment",
    paymentSchema
);