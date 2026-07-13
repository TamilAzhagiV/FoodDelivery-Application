const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
{
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    discountType: {
        type: String,
        enum: [
            "FLAT",
            "PERCENTAGE"
        ],
        required: true
    },

    discountValue: {
        type: Number,
        required: true,
        min: 1
    },

    minimumOrderAmount: {
        type: Number,
        default: 0
    },

    maximumDiscount: {
        type: Number,
        default: null
    },

    startDate: {
        type: Date,
        required: true
    },

    expiryDate: {
        type: Date,
        required: true
    },

    usageLimit: {
        type: Number,
        required: true,
        min: 1
    },

    usedCount: {
        type: Number,
        default: 0
    },

    isActive: {
        type: Boolean,
        default: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Coupon",couponSchema);