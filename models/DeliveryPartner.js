const mongoose = require("mongoose");

const deliveryPartnerSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    dateOfBirth: {
        type: Date,
        required: true
    },

    emergencyContactNumber: {
        type: String,
        required: true,
        trim: true
    },

    vehicleType: {
        type: String,
        enum: ["BIKE", "SCOOTER", "CAR"],
        required: true
    },

    vehicleNumber: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },

    drivingLicenseNumber: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },

    aadhaarNumber: {
        type: String,
        required: true,
        trim: true
    },

    bankDetails: {
        accountHolderName: {
            type: String,
            required: true
        },

        accountNumber: {
            type: String,
            required: true
        },

        ifscCode: {
            type: String,
            required: true,
            uppercase: true
        }
    },

    availabilityStatus: {
        type: String,
        enum: ["ONLINE", "OFFLINE", "BUSY"],
        default: "OFFLINE"
    },

    isProfileCompleted: {
        type: Boolean,
        default: false
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    currentLocation: {
        latitude: Number,
        longitude: Number
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model(
    "DeliveryPartner",
    deliveryPartnerSchema
);