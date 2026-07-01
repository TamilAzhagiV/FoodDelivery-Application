const { z } = require("zod");

const phoneRegex = /^[6-9]\d{9}$/;

const phoneSchema = z
    .string({
        required_error: "Phone number is required",
        invalid_type_error: "Phone number must be a string"
    })
    .trim()
    .regex(
        phoneRegex,
        "Invalid Indian phone number"
    );

module.exports = phoneSchema;