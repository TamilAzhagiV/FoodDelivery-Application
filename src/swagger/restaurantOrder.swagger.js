/**
 * @swagger
 * tags:
 *   name: Restaurant Orders
 *   description: Restaurant Order Management APIs
 */

/**
 * @swagger
 * /restaurant/orders:
 *   get:
 *     summary: Get all restaurant orders
 *     description: Retrieve all orders placed to the restaurant owned by the logged-in owner. Sorts by newest first. Populates customer details (fullName, email, phoneNumber) and item details (name, image).
 *     tags: [Restaurant Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
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
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "6850c1c6f3a5f5f4b6a12345"
 *                           fullName:
 *                             type: string
 *                             example: "Jane Doe"
 *                           email:
 *                             type: string
 *                             example: "jane@example.com"
 *                           phoneNumber:
 *                             type: string
 *                             example: "9876543210"
 *                       restaurantId:
 *                         type: string
 *                         example: "6850c1c6f3a5f5f4b6a12346"
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
 *         description: Access denied - Restaurant Owner role required
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /restaurant/orders/{orderId}/accept:
 *   patch:
 *     summary: Accept an order
 *     description: Accept a placed order. Changes status from "PLACED" to "ACCEPTED".
 *     tags: [Restaurant Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID to accept
 *     responses:
 *       200:
 *         description: Order accepted successfully
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
 *                   example: "Order accepted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6850c1c6f3a5f5f4b6a12348"
 *                     orderStatus:
 *                       type: string
 *                       example: "ACCEPTED"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied - Restaurant Owner role required
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error - e.g. Only placed orders can be accepted
 */

/**
 * @swagger
 * /restaurant/orders/{orderId}/preparing:
 *   patch:
 *     summary: Mark order as preparing
 *     description: Mark the accepted order as preparing. Changes status from "ACCEPTED" to "PREPARING".
 *     tags: [Restaurant Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID to mark as preparing
 *     responses:
 *       200:
 *         description: Order moved to PREPARING status
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
 *                   example: "Order preparation started"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6850c1c6f3a5f5f4b6a12348"
 *                     orderStatus:
 *                       type: string
 *                       example: "PREPARING"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied - Restaurant Owner role required
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error - e.g. Only accepted orders can be prepared
 */

/**
 * @swagger
 * /restaurant/orders/{orderId}/ready:
 *   patch:
 *     summary: Mark order as ready for pickup
 *     description: Mark the preparing order as ready for pick-up. Changes status from "PREPARING" to "READY_FOR_PICKUP".
 *     tags: [Restaurant Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID to mark as ready
 *     responses:
 *       200:
 *         description: Order marked as READY_FOR_PICKUP successfully
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
 *                   example: "Order is ready for pickup"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6850c1c6f3a5f5f4b6a12348"
 *                     orderStatus:
 *                       type: string
 *                       example: "READY_FOR_PICKUP"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied - Restaurant Owner role required
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error - e.g. Only preparing orders can be marked ready
 */