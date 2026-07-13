const mongoose = require("mongoose");

const deliveryReviewSchema = new mongoose.Schema(
{
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
        unique: true
    },

    deliveryPartnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeliveryPartner",
        required: true
    },

    ratings: {

        deliveryTime: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        behaviour: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        professionalism: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        communication: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        overallExperience: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        }
    },

    review: {
        type: String,
        trim: true,
        maxlength: 500,
        default: ""
    }

},
{
    timestamps: true
});

module.exports = mongoose.model(
    "DeliveryReview",
    deliveryReviewSchema
);