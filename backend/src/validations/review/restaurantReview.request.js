const { z } = require("zod");
const objectIdSchema = require("../common/objectId.schema");

const createRestaurantReviewSchema = z.object({
    body: z.object({
        orderId: objectIdSchema,
        rating: z.coerce.number().int().min(1).max(5),
        review: z.string().trim().max(500).optional()
    }).strict()
});

const getRestaurantReviewsSchema = z.object({});

const getRestaurantReviewByIdSchema = z.object({
    params: z.object({
        reviewId: objectIdSchema
    }).strict()
});

const updateRestaurantReviewSchema = z.object({
    params: z.object({
        reviewId: objectIdSchema
    }).strict(),

    body: z.object({
        rating: z.coerce.number().int().min(1).max(5),
        review: z.string().trim().max(500).optional()
    }).strict()
});

const deleteRestaurantReviewSchema = z.object({
    params: z.object({
        reviewId: objectIdSchema
    }).strict()
});

module.exports = {
    createRestaurantReviewSchema,
    getRestaurantReviewsSchema,
    getRestaurantReviewByIdSchema,
    updateRestaurantReviewSchema,
    deleteRestaurantReviewSchema
};