/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Customer Order APIs
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Place a Cash on Delivery (COD) Order
 *     description: Creates an order from the customer's cart using Cash on Delivery.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Order placed successfully
 *               data:
 *                 _id: "687f9d5d9bdf9d9f3d9a1234"
 *                 customerId: "687f9a6b9bdf9d9f3d9a1111"
 *                 restaurantId: "687f9b7c9bdf9d9f3d9a2222"
 *                 paymentMethod: "COD"
 *                 paymentStatus: "PENDING"
 *                 orderStatus: "PLACED"
 *                 totalAmount: 140
 *                 items:
 *                   - menuItemId: "687f9c7d9bdf9d9f3d9a3333"
 *                     quantity: 2
 *                     price: 70
 *                 createdAt: "2026-07-02T10:30:00.000Z"
 *       400:
 *         description: Cart is empty
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Menu item not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get Customer Orders
 *     description: Returns all orders placed by the logged-in customer.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id: "687f9d5d9bdf9d9f3d9a1234"
 *                   restaurantId:
 *                     restaurantName: "Spicy Kitchen"
 *                   paymentMethod: "ONLINE"
 *                   paymentStatus: "SUCCESS"
 *                   orderStatus: "DELIVERED"
 *                   totalAmount: 250
 *                   createdAt: "2026-07-02T10:30:00.000Z"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Get Order By ID
 *     description: Returns complete details of a specific customer order.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         example: 687f9d5d9bdf9d9f3d9a1234
 *     responses:
 *       200:
 *         description: Order fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 _id: "687f9d5d9bdf9d9f3d9a1234"
 *                 customerId: "687f9a6b9bdf9d9f3d9a1111"
 *                 restaurantId:
 *                   restaurantName: "Spicy Kitchen"
 *                 paymentMethod: "ONLINE"
 *                 paymentStatus: "SUCCESS"
 *                 orderStatus: "OUT_FOR_DELIVERY"
 *                 totalAmount: 250
 *                 items:
 *                   - menuItemId:
 *                       name: "Chicken Fried Rice"
 *                       image: "https://example.com/image.jpg"
 *                     quantity: 2
 *                     price: 125
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /orders/{orderId}/cancel:
 *   patch:
 *     summary: Cancel Order
 *     description: Cancels an order if its status is PLACED.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         example: 687f9d5d9bdf9d9f3d9a1234
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Order cancelled successfully
 *               data:
 *                 _id: "687f9d5d9bdf9d9f3d9a1234"
 *                 orderStatus: "CANCELLED"
 *       400:
 *         description: Order cannot be cancelled
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal Server Error
 */