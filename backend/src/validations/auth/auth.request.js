const { z } = require("zod");

const emailSchema = require("../common/email.schema");
const passwordSchema = require("../common/password.schema");
const phoneSchema = require("../common/phone.schema");
const fullNameSchema = require("../common/fullName.schema");
const { roleSchema } = require("../common/role.schema");
const otpSchema = require("../common/otp.schema");
const emailOrPhoneSchema = require("../common/emailOrPhone.schema");


const registerSchema = z.object({
    body: z.object({
            fullName: fullNameSchema,
            email: emailSchema,
            phoneNumber: phoneSchema,
            password: passwordSchema,
            role: roleSchema
        })
        .strict()
});


const loginSchema = z.object({
    body: z.object({
            emailOrPhone: emailOrPhoneSchema,
            password: passwordSchema,
            role: roleSchema
        })
        .strict()
});


const logoutSchema = z.object({});


const refreshSchema = z.object({
    headers: z.object({
        authorization: z
            .string({
                required_error: "Authorization header is required"
            })
            .startsWith(
                "Bearer ",
                "Authorization header must start with 'Bearer '"
            )
    })
});


const forgotPasswordSchema = z.object({
    body: z.object({
            email: emailSchema
        })
        .strict()
});


const verifyOtpSchema = z.object({
    body: z.object({
            email: emailSchema,
            otp: otpSchema
        })
        .strict()
});


const resetPasswordSchema = z.object({
    body: z.object({
            email: emailSchema,
            otp: otpSchema,
            newPassword: passwordSchema,
            confirmPassword: passwordSchema
        })
        .strict()
        .refine(
            data =>
                data.newPassword ===
                data.confirmPassword,
            {
                message:
                    "Passwords do not match",
                path: [
                    "confirmPassword"
                ]
            }
        )
});


const resendOtpSchema = z.object({
    body: z.object({
            email: emailSchema
        })
        .strict()
});

module.exports = {
    registerSchema,
    loginSchema,
    logoutSchema,
    refreshSchema,
    forgotPasswordSchema,
    verifyOtpSchema,
    resetPasswordSchema,
    resendOtpSchema
};