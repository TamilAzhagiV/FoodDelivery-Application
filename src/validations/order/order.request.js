const { z } = require("zod");

const objectIdSchema = require("../common/objectId.schema");

const placeOrderSchema = z.object({});

const getOrdersSchema = z.object({});

const getOrderByIdSchema = z.object({
    params: z.object({
        orderId: objectIdSchema
    }).strict()
});

const cancelOrderSchema = z.object({
    params: z.object({
        orderId: objectIdSchema
    }).strict()
});

module.exports = {
    placeOrderSchema,
    getOrdersSchema,
    getOrderByIdSchema,
    cancelOrderSchema
};