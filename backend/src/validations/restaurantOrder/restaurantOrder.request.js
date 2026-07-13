const { z } = require("zod");

const objectIdSchema = require("../common/objectId.schema");

const getRestaurantOrdersSchema = z.object({});

const acceptOrderSchema = z.object({
    params: z.object({
        orderId: objectIdSchema
    }).strict()
});

const startPreparingOrderSchema = z.object({
    params: z.object({
        orderId: objectIdSchema
    }).strict()
});

const markOrderReadySchema = z.object({
    params: z.object({
        orderId: objectIdSchema
    }).strict()
});

module.exports = {
    getRestaurantOrdersSchema,
    acceptOrderSchema,
    startPreparingOrderSchema,
    markOrderReadySchema
};