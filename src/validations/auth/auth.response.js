const { z } = require("zod");


const userResponseSchema = z.object({
    id: z.string(),
    fullName: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    role: z.enum([
        "CUSTOMER",
        "RESTAURANT_OWNER",
        "DELIVERY_PARTNER",
        "ADMIN"
    ]),
    isVerified: z.boolean(),
    status: z.enum([
        "ACTIVE",
        "INACTIVE",
        "BANNED"
    ]),
    profileComplete: z.boolean()
});

const registerResponseSchema = z.object({
    success: z.literal(true),
    message: z.string()
});


const loginResponseSchema = z.object({
    success: z.literal(true),
    message: z.string(),
    accessToken: z.string(),
    refreshToken: z.string(),
    user: userResponseSchema
});

const logoutResponseSchema = z.object({
    success: z.literal(true),
    message: z.string()
});


const refreshResponseSchema = z.object({
    success: z.literal(true),
    message: z.string(),
    accessToken: z.string(),
    user: userResponseSchema
});

const forgotPasswordResponseSchema = z.object({
    success: z.literal(true),
    message: z.string()
});

const verifyOtpResponseSchema = z.object({
    success: z.literal(true),
    message: z.string()
});

const resetPasswordResponseSchema = z.object({
    success: z.literal(true),
    message: z.string()
});

const resendOtpResponseSchema = z.object({
    success: z.literal(true),
    message: z.string()
});


const errorResponseSchema = z.object({
    success: z.literal(false),
    message: z.string()
});

module.exports = {
    userResponseSchema,
    registerResponseSchema,
    loginResponseSchema,
    logoutResponseSchema,
    refreshResponseSchema,
    forgotPasswordResponseSchema,
    verifyOtpResponseSchema,
    resetPasswordResponseSchema,
    resendOtpResponseSchema,
    errorResponseSchema
};