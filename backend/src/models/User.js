const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
        minlength: [3, "Full name must be at least 3 characters"],
        maxlength: [100, "Full name cannot exceed 100 characters"]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Invalid email format"
        ]
    },

    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        trim: true,
        match: [
            /^[6-9]\d{9}$/,
            "Invalid Indian phone number"
        ]
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"]
    },

    role: {
        type: String,
        enum: {
            values: [
                "CUSTOMER",
                "RESTAURANT_OWNER",
                "DELIVERY_PARTNER",
                "ADMIN"
            ],
            message: "Invalid role"
        },
        required: true
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    status: {
        type: String,
        enum: [
            "ACTIVE",
            "INACTIVE",
            "BLOCKED"
        ],
        default: "ACTIVE"
    },

    refreshToken: {
        type: String,
        default: null
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model(
    "User",
    userSchema
);