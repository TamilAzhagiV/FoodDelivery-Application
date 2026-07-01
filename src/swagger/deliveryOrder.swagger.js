/**
 * @swagger
 * tags:
 *   name: Delivery Orders
 *   description: Delivery Partner Order Management APIs
 */

/**
 * @swagger
 * /delivery-orders:
 *   get:
 *     summary: Get available delivery orders
 *     description: Retrieve all orders that are ready for pickup and do not have a delivery partner assigned yet. Sorts by newest first. Populates customer details (fullName, phoneNumber), restaurant details (restaurantName), and menu item details (name, image).
 *     tags: [Delivery Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Available delivery orders fetched successfully
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
 *                           phoneNumber:
 *                             type: string
 *                             example: "9876543210"
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
 *                       totalAmount:
 *                         type: number
 *                         example: 500
 *                       orderStatus:
 *                         type: string
 *                         example: "READY_FOR_PICKUP"
 *                       createdAt:
 *                         type: string
 *                         example: "2026-06-25T12:10:00.000Z"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied - Delivery Partner role required
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /delivery-orders/{orderId}/accept:
 *   patch:
 *     summary: Accept delivery order
 *     description: Accept a delivery order. Changes status from "READY_FOR_PICKUP" to "OUT_FOR_DELIVERY" and assigns the logged-in delivery partner.
 *     tags: [Delivery Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID to accept for delivery
 *     responses:
 *       200:
 *         description: Delivery order accepted successfully
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
 *                   example: "Delivery order accepted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6850c1c6f3a5f5f4b6a12348"
 *                     orderStatus:
 *                       type: string
 *                       example: "OUT_FOR_DELIVERY"
 *                     deliveryPartnerId:
 *                       type: string
 *                       example: "6850c1c6f3a5f5f4b6a12349"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied - Delivery Partner role required
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error - e.g. Order is not ready for pickup, or already accepted
 */

/**
 * @swagger
 * /delivery-orders/{orderId}/pickup:
 *   patch:
 *     summary: Confirm order pickup
 *     description: Mark the order as picked up from the restaurant. Sets the pickedUpAt timestamp.
 *     tags: [Delivery Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID that is picked up
 *     responses:
 *       200:
 *         description: Order picked up successfully
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
 *                   example: "Order picked up successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6850c1c6f3a5f5f4b6a12348"
 *                     orderStatus:
 *                       type: string
 *                       example: "OUT_FOR_DELIVERY"
 *                     pickedUpAt:
 *                       type: string
 *                       example: "2026-06-25T12:30:00.000Z"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied - Delivery Partner role required
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error - e.g. Order is not out for delivery
 */

/**
 * @swagger
 * /delivery-orders/{orderId}/delivered:
 *   patch:
 *     summary: Confirm order delivery
 *     description: Mark the order as delivered to the customer. Changes status to "DELIVERED" and sets the deliveredAt timestamp.
 *     tags: [Delivery Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID that is delivered
 *     responses:
 *       200:
 *         description: Order delivered successfully
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
 *                   example: "Order delivered successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6850c1c6f3a5f5f4b6a12348"
 *                     orderStatus:
 *                       type: string
 *                       example: "DELIVERED"
 *                     deliveredAt:
 *                       type: string
 *                       example: "2026-06-25T12:45:00.000Z"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied - Delivery Partner role required
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error - e.g. Order is not out for delivery
 */
