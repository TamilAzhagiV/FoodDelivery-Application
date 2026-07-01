/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order Management APIs for Customers
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Place Order
 *     description: Place a new order using the items currently in the logged-in customer's cart. This will empty the cart after successful order placement.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Order placed successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6850c1c6f3a5f5f4b6a12348"
 *                     customerId:
 *                       type: string
 *                       example: "6850c1c6f3a5f5f4b6a12345"
 *                     restaurantId:
 *                       type: string
 *                       example: "6850c1c6f3a5f5f4b6a12346"
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                     totalAmount:
 *                       type: number
 *                       example: 500
 *                     orderStatus:
 *                       type: string
 *                       example: PLACED
 *       400:
 *         description: Bad Request - e.g. Cart is empty
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Customer role required
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get Customer Orders
 *     description: Get all orders placed by the current customer, sorted newest first. Populates the restaurantId (name) and items.menuItemId (name, image).
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6850c1c6f3a5f5f4b6a12348"
 *                       customerId:
 *                         type: string
 *                         example: "6850c1c6f3a5f5f4b6a12345"
 *                       restaurantId:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "6850c1c6f3a5f5f4b6a12346"
 *                           restaurantName:
 *                             type: string
 *                             example: "Gourmet Paradise"
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             menuItemId:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                   example: "6850c1c6f3a5f5f4b6a12347"
 *                                 name:
 *                                   type: string
 *                                   example: "Paneer Butter Masala"
 *                                 image:
 *                                   type: string
 *                                   example: "paneer.jpg"
 *                             quantity:
 *                               type: integer
 *                               example: 2
 *                             price:
 *                               type: number
 *                               example: 250
 *                             _id:
 *                               type: string
 *                               example: "6850c1c6f3a5f5f4b6a1234b"
 *                       totalAmount:
 *                         type: number
 *                         example: 500
 *                       orderStatus:
 *                         type: string
 *                         example: "PLACED"
 *                       createdAt:
 *                         type: string
 *                         example: "2026-06-25T12:10:00.000Z"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Customer role required
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Get Order Details
 *     description: Retrieve details of a specific order. Populates the restaurantId (name) and items.menuItemId (name, image).
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the order
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6850c1c6f3a5f5f4b6a12348"
 *                     customerId:
 *                       type: string
 *                       example: "6850c1c6f3a5f5f4b6a12345"
 *                     restaurantId:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "6850c1c6f3a5f5f4b6a12346"
 *                         restaurantName:
 *                           type: string
 *                           example: "Gourmet Paradise"
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           menuItemId:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: "6850c1c6f3a5f5f4b6a12347"
 *                               name:
 *                                 type: string
 *                                 example: "Paneer Butter Masala"
 *                               image:
 *                                 type: string
 *                                 example: "paneer.jpg"
 *                           quantity:
 *                             type: integer
 *                             example: 2
 *                           price:
 *                             type: number
 *                             example: 250
 *                     totalAmount:
 *                       type: number
 *                       example: 500
 *                     orderStatus:
 *                       type: string
 *                       example: "PLACED"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Customer role required
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders/{orderId}/cancel:
 *   patch:
 *     summary: Cancel Order
 *     description: Cancel an order. An order can only be cancelled if its current status is "PLACED".
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the order to cancel
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Order cancelled successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6850c1c6f3a5f5f4b6a12348"
 *                     orderStatus:
 *                       type: string
 *                       example: "CANCELLED"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Customer role required
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error - e.g. Order cannot be cancelled
 */
