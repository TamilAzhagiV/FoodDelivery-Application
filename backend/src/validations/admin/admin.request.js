const { z } = require("zod");

const objectIdSchema = require("../common/objectId.schema");

const getAllRestaurantsSchema = z.object({});

const getPendingRestaurantsSchema = z.object({});

const approveRestaurantSchema = z.object({
    params: z.object({
        restaurantId: objectIdSchema
    }).strict()
});

const rejectRestaurantSchema = z.object({
    params: z.object({
        restaurantId: objectIdSchema
    }).strict(),

    body: z.object({
        rejectionReason: z
            .string()
            .trim()
            .min(5)
            .max(500)
    }).strict()
});

const getAllDeliveryPartnersSchema = z.object({});

const getPendingDeliveryPartnersSchema = z.object({});

const approveDeliveryPartnerSchema = z.object({
    params: z.object({
        partnerId: objectIdSchema
    }).strict()
});

const rejectDeliveryPartnerSchema = z.object({
    params: z.object({
        partnerId: objectIdSchema
    }).strict(),

    body: z.object({
        rejectionReason: z
            .string()
            .trim()
            .min(5)
            .max(500)
    }).strict()
});

module.exports = {
    getAllRestaurantsSchema,
    getPendingRestaurantsSchema,
    approveRestaurantSchema,
    rejectRestaurantSchema,
    getAllDeliveryPartnersSchema,
    getPendingDeliveryPartnersSchema,
    approveDeliveryPartnerSchema,
    rejectDeliveryPartnerSchema
};