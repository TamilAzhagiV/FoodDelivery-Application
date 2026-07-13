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
    foodTotal: {
    type: Number,
    required: true,
    min: 0
},

deliveryFee: {
    type: Number,
    required: true,
    default: 0,
    min: 0
},
gst: {
    type: Number,
    required: true,
    default: 0,
    min: 0
},
deliveryPartnerEarnings: {
    type: Number,
    required: true,
    default: 0,
    min: 0
},

platformCommission: {
    type: Number,
    required: true,
    default: 0,
    min: 0
},
cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
},

cancelledAt: {
    type: Date,
    default: null
},

cancellationReason: {
    type: String,
    default: null
},

platformFee: {
    type: Number,
    default: 0,
    min: 0
},

discount: {
    type: Number,
    default: 0,
    min: 0
},

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