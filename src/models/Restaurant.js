const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
{
    // Owner
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    // Basic Info
    restaurantName: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    logo: {
        type: String,
        default: null
    },

    coverImage: {
        type: String,
        default: null
    },

    cuisineTypes: [{
        type: String,
        trim: true
    }],

    tags: [{
        type: String,
        trim: true
    }],

    // Contact Details
    businessPhoneNumber: {
        type: String,
        required: true
    },

    businessEmail: {
        type: String,
        required: true,
        lowercase: true
    },

    supportPhoneNumber: {
        type: String
    },

    supportEmail: {
        type: String
    },

    // Address
    address: {
        street: {
            type: String,
            required: true
        },

        area: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        state: {
            type: String,
            required: true
        },

        country: {
            type: String,
            default: "India"
        },

        pincode: {
            type: String,
            required: true
        }
    },

    // Geo Location
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },

        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },

    // Legal Information
    gstNumber: {
        type: String,
        required: true,
        unique: true
    },

    fssaiLicenseNumber: {
        type: String,
        required: true,
        unique: true
    },

    fssaiExpiryDate: {
        type: Date
    },

    // Bank Details
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
            required: true
        },

        bankName: {
            type: String,
            required: true
        }
    },

    // Business Configuration
    deliveryRadius: {
        type: Number,
        default: 5
    },

    averagePreparationTime: {
        type: Number,
        default: 30
    },

    minimumOrderAmount: {
        type: Number,
        default: 0
    },

    freeDeliveryAbove: {
        type: Number,
        default: 0
    },

    // Weekly Timings
    operatingHours: [
        {
            day: {
                type: String,
                enum: [
                    "MONDAY",
                    "TUESDAY",
                    "WEDNESDAY",
                    "THURSDAY",
                    "FRIDAY",
                    "SATURDAY",
                    "SUNDAY"
                ]
            },

            openTime: String,

            closeTime: String,

            isClosed: {
                type: Boolean,
                default: false
            }
        }
    ],

    // Ratings
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },

    totalRatings: {
        type: Number,
        default: 0
    },

    // Order Analytics
    totalOrders: {
        type: Number,
        default: 0
    },

    completedOrders: {
        type: Number,
        default: 0
    },

    cancelledOrders: {
        type: Number,
        default: 0
    },

    // Verification
    verification: {

        emailVerified: {
            type: Boolean,
            default: false
        },

        phoneVerified: {
            type: Boolean,
            default: false
        },

        gstVerified: {
            type: Boolean,
            default: false
        },

        fssaiVerified: {
            type: Boolean,
            default: false
        }
    },

    // Restaurant Profile Status
    profileStatus: {
        type: String,
        enum: [
            "INCOMPLETE",
            "COMPLETED"
        ],
        default: "INCOMPLETE"
    },

    // Admin Approval Workflow
    approvalStatus: {
        type: String,
        enum: [
            "PENDING",
            "UNDER_REVIEW",
            "APPROVED",
            "REJECTED",
            "SUSPENDED"
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
    },

    // Live Restaurant Status
    operationalStatus: {
        type: String,
        enum: [
            "OPEN",
            "CLOSED",
            "TEMPORARILY_CLOSED"
        ],
        default: "CLOSED"
    },

    // Soft Delete
    isActive: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
}
);

// Geospatial Index
restaurantSchema.index({
    location: "2dsphere"
});

module.exports = mongoose.model(
    "Restaurant",
    restaurantSchema
);