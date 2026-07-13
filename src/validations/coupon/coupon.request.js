const { z } = require("zod");

const createCouponSchema = {
    body: z.object({

        code: z
            .string()
            .trim()
            .min(3)
            .max(30)
            .toUpperCase(),

        title: z
            .string()
            .trim()
            .min(3)
            .max(100),

        description: z
            .string()
            .trim()
            .min(5)
            .max(500),

        discountType: z.enum([
            "FLAT",
            "PERCENTAGE"
        ]),

        discountValue: z
            .coerce
            .number()
            .positive(),

        minimumOrderAmount: z
            .coerce
            .number()
            .min(0)
            .default(0),

        maximumDiscount: z
            .coerce
            .number()
            .positive()
            .nullable()
            .optional(),

        startDate: z
            .string()
            .datetime(),

        expiryDate: z
            .string()
            .datetime(),

        usageLimit: z
            .coerce
            .number()
            .int()
            .positive()

    })
    .refine(
        (data) =>
            new Date(data.expiryDate) >
            new Date(data.startDate),
        {
            message:
                "Expiry date must be after start date",
            path: ["expiryDate"]
        }
    ),

    params: z.object({}),

    query: z.object({})
};

const getAllCouponsSchema = {
    body: z.object({}),

    params: z.object({}),

    query: z.object({
        page: z.coerce
            .number()
            .min(1)
            .default(1),

        limit: z.coerce
            .number()
            .min(1)
            .max(100)
            .default(10)
    })
};

const getCouponByIdSchema = {
    body: z.object({}),

    params: z.object({
        couponId: z
            .string()
            .regex(
                /^[0-9a-fA-F]{24}$/,
                "Invalid Coupon Id"
            )
    }),

    query: z.object({})
};

const updateCouponSchema = {
    body: z.object({

        code: z
            .string()
            .trim()
            .min(3)
            .max(30)
            .toUpperCase()
            .optional(),

        title: z
            .string()
            .trim()
            .min(3)
            .max(100)
            .optional(),

        description: z
            .string()
            .trim()
            .min(5)
            .max(500)
            .optional(),

        discountType: z
            .enum([
                "FLAT",
                "PERCENTAGE"
            ])
            .optional(),

        discountValue: z
            .coerce
            .number()
            .positive()
            .optional(),

        minimumOrderAmount: z
            .coerce
            .number()
            .min(0)
            .optional(),

        maximumDiscount: z
            .coerce
            .number()
            .positive()
            .nullable()
            .optional(),

        startDate: z
            .string()
            .datetime()
            .optional(),

        expiryDate: z
            .string()
            .datetime()
            .optional(),

        usageLimit: z
            .coerce
            .number()
            .int()
            .positive()
            .optional(),

        isActive: z
            .boolean()
            .optional()

    })
    .refine(
    (data) => {
        if (data.startDate && data.expiryDate) {
            return (
                new Date(data.expiryDate) >
                new Date(data.startDate)
            );
        }

        return true;
    },
    {
        message: "Expiry date must be after start date",
        path: ["expiryDate"]
    }
),

    params: z.object({
        couponId: z
            .string()
            .regex(
                /^[0-9a-fA-F]{24}$/,
                "Invalid Coupon Id"
            )
    }),

    query: z.object({})
};

const deleteCouponSchema = {
    body: z.object({}),

    params: z.object({
        couponId: z
            .string()
            .regex(
                /^[0-9a-fA-F]{24}$/,
                "Invalid Coupon Id"
            )
    }),

    query: z.object({})
};

module.exports={
    createCouponSchema,
    getAllCouponsSchema,
    getCouponByIdSchema,
    updateCouponSchema,
    deleteCouponSchema
}