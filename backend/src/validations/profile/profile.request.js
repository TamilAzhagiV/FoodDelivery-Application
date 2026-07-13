const { z } = require("zod");

const emailSchema = require("../common/email.schema");
const phoneSchema = require("../common/phone.schema");
const passwordSchema = require("../common/password.schema");

const getProfileSchema = z.object({});

const updateProfileSchema = z.object({
    body: z.object({

        // ===========================
        // Customer Profile
        // ===========================
        addresses: z.string().optional(),
        preferences: z.string().optional(),

        // ===========================
        // Restaurant Profile
        // ===========================
        restaurantName: z.string().min(3).max(100).optional(),

        description: z.string().max(500).optional(),

        cuisineTypes: z.string().optional(),

        tags: z.string().optional(),

        businessPhoneNumber: phoneSchema.optional(),

        businessEmail: emailSchema.optional(),

        supportPhoneNumber: phoneSchema.optional(),

        supportEmail: emailSchema.optional(),

        address: z.string().optional(),

        gstNumber: z.string().trim().optional(),

        fssaiLicenseNumber: z.string().trim().optional(),

        fssaiExpiryDate: z.string().optional(),

        bankDetails: z.string().optional(),

        deliveryRadius: z.coerce.number().min(0).optional(),

        averagePreparationTime: z.coerce.number().min(1).optional(),

        minimumOrderAmount: z.coerce.number().min(0).optional(),

        freeDeliveryAbove: z.coerce.number().min(0).optional(),

        operatingHours: z.string().optional(),

        // ===========================
        // Delivery Partner
        // ===========================
        dateOfBirth: z.string().optional(),

        emergencyContactNumber: phoneSchema.optional(),

        aadhaarNumber: z.string().trim().optional(),

        vehicleType: z.enum([
            "BIKE",
            "SCOOTER",
            "CAR"
        ]).optional(),

        vehicleNumber: z.string().trim().optional(),

        vehicleModel: z.string().trim().optional(),

        drivingLicenseNumber: z.string().trim().optional(),

        drivingLicenseExpiryDate: z.string().optional(),

        currentLocation: z.string().optional()

    }).strict()
});

const changePasswordSchema = {
    body: z.object({
        currentPassword: passwordSchema,

        newPassword: passwordSchema,

        confirmPassword: passwordSchema
    })
    .refine(
        (data) =>
            data.newPassword === data.confirmPassword,
        {
            message: "Confirm password does not match",
            path: ["confirmPassword"]
        }
    )
    .refine(
        (data) =>
            data.currentPassword !== data.newPassword,
        {
            message: "New password must be different from current password",
            path: ["newPassword"]
        }
    ),

    params: z.object({}),

    query: z.object({})
};

const deleteAccountSchema = {
    body: z.object({}),

    params: z.object({}),

    query: z.object({})
};

const logoutAllSchema = {
    body: z.object({}),
    params: z.object({}),
    query: z.object({})
};

module.exports = {
    getProfileSchema,
    updateProfileSchema,
    changePasswordSchema,
    deleteAccountSchema,
    logoutAllSchema
};