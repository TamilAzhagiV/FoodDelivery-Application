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

const getDashboardSchema = {
    body: z.object({}),
    params: z.object({}),
    query: z.object({})
};

const getAllUsersSchema = {
    body: z.object({}),
    params: z.object({}),
    query: z.object({})
};

const getUserByIdSchema = {
    body: z.object({}),
    params: z.object({
        userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid User Id")
    }),
    query: z.object({})
};

const blockUserSchema = {
    body: z.object({
        blockedReason: z
            .string()
            .trim()
            .min(5)
            .max(200)
    }),
    params: z.object({
        userId: z
            .string()
            .regex(
                /^[0-9a-fA-F]{24}$/,
                "Invalid User Id"
            )
    }),
    query: z.object({})
};

const unblockUserSchema = {
    body: z.object({}),
    params: z.object({
        userId: z
            .string()
            .regex(
                /^[0-9a-fA-F]{24}$/,
                "Invalid User Id"
            )
    }),
    query: z.object({})
};

const getRestaurantByIdSchema = {
    body: z.object({}),
    params: z.object({
        restaurantId: z
            .string()
            .regex(
                /^[0-9a-fA-F]{24}$/,
                "Invalid Restaurant Id"
            )
    }),
    query: z.object({})
};

const getDeliveryPartnerByIdSchema = {
    body: z.object({}),
    params: z.object({
        partnerId: z
            .string()
            .regex(
                /^[0-9a-fA-F]{24}$/,
                "Invalid Delivery Partner Id"
            )
    }),
    query: z.object({})
};

const blockDeliveryPartnerSchema = {
    body: z.object({
        blockedReason: z
            .string()
            .trim()
            .min(5)
            .max(200)
    }),
    params: z.object({
        partnerId: z
            .string()
            .regex(
                /^[0-9a-fA-F]{24}$/,
                "Invalid Delivery Partner Id"
            )
    }),
    query: z.object({})
};

const unblockDeliveryPartnerSchema = {
    body: z.object({}),
    params: z.object({
        partnerId: z
            .string()
            .regex(
                /^[0-9a-fA-F]{24}$/,
                "Invalid Delivery Partner Id"
            )
    }),
    query: z.object({})
};

const getAllOrdersSchema = {
    body: z.object({}),
    params: z.object({}),
    query: z.object({
        page: z.coerce.number().min(1).default(1),
        limit: z.coerce.number().min(1).max(100).default(10)
    })
};

const getOrderByIdSchema = {
    body: z.object({}),
    params: z.object({
        orderId: z
            .string()
            .regex(
                /^[0-9a-fA-F]{24}$/,
                "Invalid Order Id"
            )
    }),
    query: z.object({})
};

const getOrdersByStatusSchema = {
    body: z.object({}),
    params: z.object({
        status: z.enum([
            "PAYMENT_PENDING",
            "PLACED",
            "ACCEPTED",
            "PREPARING",
            "READY_FOR_PICKUP",
            "OUT_FOR_DELIVERY",
            "DELIVERED",
            "CANCELLED"
        ])
    }),
    query: z.object({
        page: z.coerce.number().min(1).default(1),
        limit: z.coerce.number().min(1).max(100).default(10)
    })
};

const cancelOrderSchema = {
    body: z.object({
        reason: z
            .string()
            .trim()
            .min(5)
            .max(200)
    }),
    params: z.object({
        orderId: z
            .string()
            .regex(
                /^[0-9a-fA-F]{24}$/,
                "Invalid Order Id"
            )
    }),
    query: z.object({})
};

const updateOrderStatusSchema = {
    body: z.object({
        orderStatus: z.enum([
            "PAYMENT_PENDING",
            "PLACED",
            "ACCEPTED",
            "PREPARING",
            "READY_FOR_PICKUP",
            "OUT_FOR_DELIVERY",
            "DELIVERED",
            "CANCELLED"
        ])
    }),
    params: z.object({
        orderId: z.string().regex(
            /^[0-9a-fA-F]{24}$/,
            "Invalid Order Id"
        )
    }),
    query: z.object({})
};

const getAllPaymentsSchema = {
    body: z.object({}),
    params: z.object({}),
    query: z.object({
        page: z.coerce.number().min(1).default(1),
        limit: z.coerce.number().min(1).max(100).default(10)
    })
};

const getPaymentByIdSchema = {
    body: z.object({}),
    params: z.object({
        paymentId: z
            .string()
            .regex(
                /^[0-9a-fA-F]{24}$/,
                "Invalid Payment Id"
            )
    }),
    query: z.object({})
};

const getPaymentsByStatusSchema = {
    body: z.object({}),
    params: z.object({
        status: z.enum([
            "PENDING",
            "SUCCESS",
            "FAILED",
            "REFUNDED"
        ])
    }),
    query: z.object({
        page: z.coerce.number().min(1).default(1),
        limit: z.coerce.number().min(1).max(100).default(10)
    })
};

const getPaymentStatisticsSchema = {
    body: z.object({}),
    params: z.object({}),
    query: z.object({})
};

module.exports = {
    getAllRestaurantsSchema,
    getPendingRestaurantsSchema,
    approveRestaurantSchema,
    rejectRestaurantSchema,
    getAllDeliveryPartnersSchema,
    getPendingDeliveryPartnersSchema,
    approveDeliveryPartnerSchema,
    rejectDeliveryPartnerSchema,
    getDashboardSchema,
    getAllUsersSchema,
    getUserByIdSchema,
    blockUserSchema,
    unblockUserSchema,
    getRestaurantByIdSchema,
    getDeliveryPartnerByIdSchema,
    blockDeliveryPartnerSchema,
    unblockDeliveryPartnerSchema,
    getAllOrdersSchema,
    getOrderByIdSchema,
    getOrdersByStatusSchema,
    cancelOrderSchema,
    updateOrderStatusSchema,
    getAllPaymentsSchema,
    getPaymentByIdSchema,
    getPaymentsByStatusSchema
};