const { z } = require("zod");

const createPaymentSchema = z.object({
    body: z.object({}).strict()
});

const verifyPaymentSchema = z.object({
    body: z.object({
        paymentId: z.string().min(1, "Payment ID is required"),
        razorpayOrderId: z.string().min(1, "Razorpay Order ID is required"),
        razorpayPaymentId: z.string().min(1, "Razorpay Payment ID is required"),
        razorpaySignature: z.string().min(1, "Razorpay Signature is required")
    }).strict()
});

module.exports = {
    createPaymentSchema,
    verifyPaymentSchema
};