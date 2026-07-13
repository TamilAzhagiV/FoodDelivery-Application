const { z } = require("zod");

const objectIdSchema = require("../common/objectId.schema");

const addToCartSchema = z.object({
    body: z.object({
        menuItemId: objectIdSchema,
        quantity: z.coerce.number().int().min(1)
    }).strict()
});

const getCartSchema = z.object({});

const updateCartItemSchema = z.object({
    params: z.object({
        menuItemId: objectIdSchema
    }).strict(),

    body: z.object({
        quantity: z.coerce.number().int().min(1)
    }).strict()
});

const removeCartItemSchema = z.object({
    params: z.object({
        menuItemId: objectIdSchema
    }).strict()
});

const clearCartSchema = z.object({});

module.exports = {
    addToCartSchema,
    getCartSchema,
    updateCartItemSchema,
    removeCartItemSchema,
    clearCartSchema
};