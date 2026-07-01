const { z } = require("zod");

const objectIdSchema = require("../common/objectId.schema");

const getAvailableOrdersSchema = z.object({});

const acceptDeliveryOrderSchema = z.object({
    params: z.object({
        orderId: objectIdSchema
    }).strict()
});

const pickupOrderSchema = z.object({
    params: z.object({
        orderId: objectIdSchema
    }).strict()
});

const deliverOrderSchema = z.object({
    params: z.object({
        orderId: objectIdSchema
    }).strict()
});

module.exports = {
    getAvailableOrdersSchema,
    acceptDeliveryOrderSchema,
    pickupOrderSchema,
    deliverOrderSchema
};