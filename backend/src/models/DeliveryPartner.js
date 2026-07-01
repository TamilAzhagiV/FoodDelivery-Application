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

    aadhaarNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    profileImage: {
    type: String,
    trim: true,
    default: null
},

    vehicleType: {
        type: String,
        enum: ["BIKE", "SCOOTER", "CAR"],
        required: true
    },

    vehicleNumber: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },

    vehicleModel: {
        type: String
    },

    drivingLicenseNumber: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },

    drivingLicenseExpiryDate: {
        type: Date
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
        },

        bankName: {
            type: String,
            required: true
        }
    },

    currentLocation: {
        latitude: {
            type: Number
        },

        longitude: {
            type: Number
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

    rating: {
        type: Number,
        default: 0
    },

    totalRatings: {
        type: Number,
        default: 0
    },

    totalDeliveries: {
        type: Number,
        default: 0
    },

    completedDeliveries: {
        type: Number,
        default: 0
    },

    cancelledDeliveries: {
        type: Number,
        default: 0
    },

    earningsToday: {
        type: Number,
        default: 0
    },

    earningsThisMonth: {
        type: Number,
        default: 0
    },

    totalEarnings: {
        type: Number,
        default: 0
    },

    lastActiveAt: {
        type: Date
    },

    isActive: {
        type: Boolean,
        default: true
    },

    isBlocked: {
        type: Boolean,
        default: false
    },

    blockedReason: {
        type: String
    },
    approvalStatus: {
    type: String,
    enum: [
        "PENDING",
        "APPROVED",
        "REJECTED"
    ],
    default: "PENDING"
},

approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
},

approvedAt: {
    type: Date,
    default: null
},

rejectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
},

rejectedAt: {
    type: Date,
    default: null
},

rejectionReason: {
    type: String,
    default: null
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