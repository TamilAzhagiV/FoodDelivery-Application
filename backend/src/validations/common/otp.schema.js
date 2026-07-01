const { z } = require("zod");

const otpSchema = z
    .string({
        required_error: "OTP is required",
        invalid_type_error: "OTP must be a string"
    })
    .trim()
    .length(
        6,
        "OTP must be exactly 6 digits"
    )
    .regex(
        /^\d{6}$/,
        "OTP must contain only digits"
    );

module.exports = otpSchema; 