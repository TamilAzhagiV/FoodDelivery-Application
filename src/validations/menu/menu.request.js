const { z } = require("zod");
const objectIdSchema = require("../common/objectId.schema");

const createMenuItemSchema = z.object({
    body: z.object({
        name: z.string()
            .trim()
            .min(2, "Menu name must be at least 2 characters")
            .max(100, "Menu name cannot exceed 100 characters"),

        description: z.string()
            .trim()
            .optional(),

        category: z.string()
            .trim()
            .min(2, "Category is required"),

        cuisineType: z.string()
            .trim()
            .optional(),

        foodType: z.string()
            .trim()
            .optional(),

        preparationTime: z.coerce.number()
            .min(1, "Preparation time must be at least 1 minute")
            .optional(),

        price: z.coerce.number()
            .min(0, "Price cannot be negative"),

        image: z.string().optional(),

        isVeg: z.coerce.boolean().optional(),

        isAvailable: z.coerce.boolean().optional()
    }).strict()
});

const getRestaurantMenuSchema = z.object({});

const getMenuItemByIdSchema = z.object({
    params: z.object({
        menuItemId: objectIdSchema
    }).strict()
});

const updateMenuItemSchema = z.object({
    params: z.object({
        menuItemId: objectIdSchema
    }).strict(),

    body: z.object({
        name: z.string()
            .trim()
            .min(2)
            .max(100)
            .optional(),

        description: z.string()
            .trim()
            .optional(),

        category: z.string()
            .trim()
            .optional(),

        cuisineType: z.string()
            .trim()
            .optional(),

        foodType: z.string()
            .trim()
            .optional(),

        preparationTime: z.coerce.number()
            .min(1)
            .optional(),

        price: z.coerce.number()
            .min(0)
            .optional(),

        image: z.string().optional(),

        isVeg: z.coerce.boolean().optional(),

        isAvailable: z.coerce.boolean().optional()
    }).strict()
});

const deleteMenuItemSchema = z.object({
    params: z.object({
        menuItemId: objectIdSchema
    }).strict()
});

module.exports = {
    createMenuItemSchema,
    getRestaurantMenuSchema,
    getMenuItemByIdSchema,
    updateMenuItemSchema,
    deleteMenuItemSchema
};