const mongoose = require("mongoose");

const restaurantReviewSchema = new mongoose.Schema(
{
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },

    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },

    ratings: {
        foodQuality: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        taste: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        packaging: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        valueForMoney: {
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
    "RestaurantReview",
    restaurantReviewSchema
);