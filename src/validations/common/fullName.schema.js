const { z } = require("zod");

const fullNameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

const fullNameSchema = z
    .string({
        required_error: "Full name is required",
        invalid_type_error: "Full name must be a string"
    })
    .trim()
    .min(
        3,
        "Full name must contain at least 3 characters"
    )
    .max(
        100,
        "Full name cannot exceed 100 characters"
    )
    .regex(
        fullNameRegex,
        "Full name should contain only letters and single spaces"
    );

module.exports = fullNameSchema;