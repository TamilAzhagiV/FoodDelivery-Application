/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment APIs
 */

/**
 * @swagger
 * /payments/create:
 *   post:
 *     summary: Create Razorpay Payment Order
 *     description: Creates a Razorpay order for the customer's current cart and returns the payment details required to open Razorpay Checkout.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Proceed to payment
 *               data:
 *                 paymentId: "687fa8cb1fcb2f84bfe8c123"
 *                 razorpayOrderId: "order_T8WyUcCZ4QbjUU"
 *                 amount: 14000
 *                 currency: "INR"
 *                 key: "rzp_test_xxxxxxxxx"
 *       400:
 *         description: Cart is empty
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /payments/verify:
 *   post:
 *     summary: Verify Razorpay Payment
 *     description: Verifies the Razorpay payment signature. On successful verification, creates the order, links the payment to the order, and clears the customer's cart.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentId
 *               - razorpayOrderId
 *               - razorpayPaymentId
 *               - razorpaySignature
 *             properties:
 *               paymentId:
 *                 type: string
 *                 example: 687fa8cb1fcb2f84bfe8c123
 *               razorpayOrderId:
 *                 type: string
 *                 example: order_T8WyUcCZ4QbjUU
 *               razorpayPaymentId:
 *                 type: string
 *                 example: pay_T8Wz8mPj8AbCdE
 *               razorpaySignature:
 *                 type: string
 *                 example: 1d67d32d6a9b74d84bcbe90d5c9b7dfe8f55f4d6df3d4f1d5d3c8d6d8a123456
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Payment verified successfully
 *               data:
 *                 _id: "687fb0ab9d35f25b38e12abc"
 *                 paymentMethod: "ONLINE"
 *                 paymentStatus: "SUCCESS"
 *                 orderStatus: "PLACED"
 *                 totalAmount: 140
 *       400:
 *         description: Payment verification failed or payment expired
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /payments/webhook:
 *   post:
 *     summary: Razorpay Webhook
 *     description: Receives payment events directly from Razorpay. Used for server-to-server payment confirmation.
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Webhook processed successfully
 *       400:
 *         description: Invalid webhook signature
 *       500:
 *         description: Internal Server Error
 */