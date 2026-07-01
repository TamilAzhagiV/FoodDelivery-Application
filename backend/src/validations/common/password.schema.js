const { z } = require("zod");

const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

const passwordSchema = z
    .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string"
    })
    .trim()
    .min(
        8,
        "Password must be at least 8 characters"
    )
    .max(
        15,
        "Password cannot exceed 15 characters"
    )
    .regex(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    );

module.exports = passwordSchema;