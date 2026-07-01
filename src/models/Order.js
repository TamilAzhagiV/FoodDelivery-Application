const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },

    deliveryPartnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeliveryPartner",
        default: null
    },

    // Payment
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        default: null
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

    items: [
        {
            menuItemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "MenuItem",
                required: true
            },

            quantity: {
                type: Number,
                required: true,
                min: 1
            },

            price: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ],

    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },

    orderStatus: {
        type: String,
        enum: [
            "PAYMENT_PENDING",
            "PLACED",
            "ACCEPTED",
            "PREPARING",
            "READY_FOR_PICKUP",
            "OUT_FOR_DELIVERY",
            "DELIVERED",
            "CANCELLED"
        ],
        default: "PLACED"
    },

    pickedUpAt: {
        type: Date,
        default: null
    },

    deliveredAt: {
        type: Date,
        default: null
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);