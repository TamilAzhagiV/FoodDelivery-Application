const mongoose = require("mongoose");
const { z } = require("zod");

const objectIdSchema = z
    .string()
    .refine(
        (id) => mongoose.Types.ObjectId.isValid(id),
        {
            message: "Invalid MongoDB ObjectId"
        }
    );

module.exports = objectIdSchema;