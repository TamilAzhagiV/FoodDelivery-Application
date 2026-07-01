const { z } = require("zod");

const objectIdSchema = require("../common/objectId.schema");

const getAllRestaurantsSchema = z.object({});

const getRestaurantByIdSchema = z.object({
    params: z.object({
        restaurantId: objectIdSchema
    }).strict()
});

const getRestaurantMenuSchema = z.object({
    params: z.object({
        restaurantId: objectIdSchema
    }).strict()
});

const searchMenuItemsSchema = z.object({
    query: z.object({
        keyword: z
            .string()
            .trim()
            .min(1, "Keyword is required")
    }).strict()
});

module.exports = {
    getAllRestaurantsSchema,
    getRestaurantByIdSchema,
    getRestaurantMenuSchema,
    searchMenuItemsSchema
};