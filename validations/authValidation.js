const { z } = require("zod");

const registerSchema = z.object({
    fullName: z
        .string()
        .min(3)
        .max(100),

    email: z
        .string()
        .email(),

    phoneNumber: z
        .string()
        .regex(/^[6-9]\d{9}$/),

    password: z
        .string()
        .min(8)
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/
        ),

    role: z.enum([
        "CUSTOMER",
        "RESTAURANT_OWNER",
        "DELIVERY_PARTNER",
        "ADMIN"
    ])
});

module.exports = {
    registerSchema
};