const { z } = require("zod");

const updateAvailabilitySchema = z.object({

    body: z.object({

        availabilityStatus: z.enum([
            "ONLINE",
            "OFFLINE",
            "BUSY"
        ])

    }).strict()

});
const getCurrentOrderSchema = z.object({});

const getDeliveryHistorySchema = z.object({

    query: z.object({

        page: z.coerce.number().min(1).default(1),

        limit: z.coerce.number().min(1).max(50).default(10)

    }).optional()

});
const updateCurrentLocationSchema = z.object({
    body: z.object({
        latitude: z
            .number()
            .min(-90)
            .max(90),

        longitude: z
            .number()
            .min(-180)
            .max(180)
    })
});


const getEarningsSchema = z.object({
    query: z.object({
        period: z.enum([
            "today",
            "week",
            "month",
            "lifetime"
        ]).optional()
    })
});

const getStatisticsSchema = {
    body: z.object({}),
    params: z.object({}),
    query: z.object({})
};

const getDashboardSchema = {
    body: z.object({}),
    params: z.object({}),
    query: z.object({})
};


module.exports = {
    updateAvailabilitySchema,
    getCurrentOrderSchema,
    getDeliveryHistorySchema,
    updateCurrentLocationSchema,
    getEarningsSchema,
    getStatisticsSchema,
    getDashboardSchema
};