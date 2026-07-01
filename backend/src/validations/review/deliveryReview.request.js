const { z } = require("zod");

const objectIdSchema = require("../common/objectId.schema");

const createDeliveryReviewSchema = z.object({
    body: z.object({

        orderId: objectIdSchema,

        ratings: z.object({

            deliveryTime: z.coerce.number().int().min(1).max(5),

            behaviour: z.coerce.number().int().min(1).max(5),

            professionalism: z.coerce.number().int().min(1).max(5),

            communication: z.coerce.number().int().min(1).max(5),

            overallExperience: z.coerce.number().int().min(1).max(5)

        }).strict(),

        review: z.string().trim().max(500).optional()

    }).strict()
});

const getDeliveryReviewsSchema = z.object({});

const getDeliveryReviewByIdSchema = z.object({

    params: z.object({

        reviewId: objectIdSchema

    }).strict()

});

const updateDeliveryReviewSchema = z.object({

    params: z.object({

        reviewId: objectIdSchema

    }).strict(),

    body: z.object({

        ratings: z.object({

            deliveryTime: z.coerce.number().int().min(1).max(5),

            behaviour: z.coerce.number().int().min(1).max(5),

            professionalism: z.coerce.number().int().min(1).max(5),

            communication: z.coerce.number().int().min(1).max(5),

            overallExperience: z.coerce.number().int().min(1).max(5)

        }).strict(),

        review: z.string().trim().max(500).optional()

    }).strict()

});

const deleteDeliveryReviewSchema = z.object({

    params: z.object({

        reviewId: objectIdSchema

    }).strict()

});

module.exports = {
    createDeliveryReviewSchema,
    getDeliveryReviewsSchema,
    getDeliveryReviewByIdSchema,
    updateDeliveryReviewSchema,
    deleteDeliveryReviewSchema
};