const { z } = require("zod");

const emailSchema = z
    .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string"
    })
    .trim()
    .toLowerCase()
    .min(5, "Email is too short")
    .max(254, "Email is too long")
    .email("Invalid email address");

module.exports = emailSchema;