const mongoose=require("mongoose")
const menuItemSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    category: {
        type: String,
        required: true,
        trim: true
    },

    cuisineType: {
        type: String,
        trim: true
    },

    foodType: {
        type: String,
        enum: ["VEG", "NON_VEG", "EGG"]
    },

    preparationTime: {
        type: Number,
        min: 1
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    image: {
        type: String,
        default: null
    },

    isVeg: {
        type: Boolean,
        default: false
    },

    isAvailable: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});
module.exports = mongoose.model("MenuItem", menuItemSchema);