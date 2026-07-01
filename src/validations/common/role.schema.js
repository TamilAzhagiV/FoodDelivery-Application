const { z } = require("zod");

const ROLES = [
    "CUSTOMER",
    "RESTAURANT_OWNER",
    "DELIVERY_PARTNER",
    "ADMIN"
];

const roleSchema = z.enum(ROLES, {
    required_error: "Role is required",
    invalid_type_error: "Invalid role"
});

module.exports = {
    roleSchema,
    ROLES
};