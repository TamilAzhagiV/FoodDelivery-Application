/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin Management APIs
 */

/**
 * @swagger
 * /admin/restaurants:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Restaurants fetched successfully
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
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Requires Admin Role
 */

/**
 * @swagger
 * /admin/restaurants/pending:
 *   get:
 *     summary: Get all pending restaurants
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pending restaurants fetched successfully
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
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /admin/restaurants/{restaurantId}/approve:
 *   patch:
 *     summary: Approve a restaurant
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the restaurant to approve
 *     responses:
 *       200:
 *         description: Restaurant approved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Restaurant not found
 */

/**
 * @swagger
 * /admin/restaurants/{restaurantId}/reject:
 *   post:
 *     summary: Reject a restaurant
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the restaurant to reject
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rejectionReason
 *             properties:
 *               rejectionReason:
 *                 type: string
 *                 example: Invalid GST Number
 *     responses:
 *       200:
 *         description: Restaurant rejected successfully
 *       400:
 *         description: Rejection reason required
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Restaurant not found
 */

/**
 * @swagger
 * /admin/delivery-partners:
 *   get:
 *     summary: Get all delivery partners
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Delivery partners fetched successfully
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
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /admin/delivery-partners/pending:
 *   get:
 *     summary: Get pending delivery partners
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pending delivery partners fetched successfully
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
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /admin/delivery-partners/{partnerId}/approve:
 *   patch:
 *     summary: Approve a delivery partner
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: partnerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the delivery partner to approve
 *     responses:
 *       200:
 *         description: Delivery partner approved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Delivery partner not found
 */

/**
 * @swagger
 * /admin/delivery-partners/{partnerId}/reject:
 *   post:
 *     summary: Reject a delivery partner
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: partnerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the delivery partner to reject
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rejectionReason
 *             properties:
 *               rejectionReason:
 *                 type: string
 *                 example: Documents are blurred or invalid
 *     responses:
 *       200:
 *         description: Delivery partner rejected successfully
 *       400:
 *         description: Rejection reason required
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Delivery partner not found
 */
/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Get admin dashboard
 *     description: Returns overall platform statistics for the admin dashboard.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard fetched successfully
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
 *                   example: Dashboard fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalUsers:
 *                       type: integer
 *                       example: 1520
 *                     totalRestaurants:
 *                       type: integer
 *                       example: 185
 *                     totalDeliveryPartners:
 *                       type: integer
 *                       example: 320
 *                     pendingRestaurantApprovals:
 *                       type: integer
 *                       example: 12
 *                     pendingDeliveryPartnerApprovals:
 *                       type: integer
 *                       example: 8
 *                     todayOrders:
 *                       type: integer
 *                       example: 248
 *                     totalRevenue:
 *                       type: number
 *                       format: double
 *                       example: 185420.50
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Forbidden
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     description: Returns all registered users in the system. Accessible only by Admin.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
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
 *                   example: Users fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6867c6c5d4b42e1f7c4d1234"
 *                       fullName:
 *                         type: string
 *                         example: Deepak B
 *                       email:
 *                         type: string
 *                         example: deepak@gmail.com
 *                       phoneNumber:
 *                         type: string
 *                         example: "9876543210"
 *                       role:
 *                         type: string
 *                         enum:
 *                           - CUSTOMER
 *                           - RESTAURANT_OWNER
 *                           - DELIVERY_PARTNER
 *                           - ADMIN
 *                         example: CUSTOMER
 *                       status:
 *                         type: string
 *                         enum:
 *                           - ACTIVE
 *                           - INACTIVE
 *                           - BANNED
 *                         example: ACTIVE
 *                       isVerified:
 *                         type: boolean
 *                         example: true
 *                       profileComplete:
 *                         type: boolean
 *                         example: true
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-07-03T10:15:30.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-07-03T10:20:45.000Z"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Forbidden
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal server error
 */
/**
 * @swagger
 * /admin/users/{userId}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User fetched successfully
 *               data:
 *                 _id: "6873f2a5e8c0d7d2c5c9f123"
 *                 fullName: "Deepak"
 *                 email: "deepak@gmail.com"
 *                 phoneNumber: "9876543210"
 *                 role: "CUSTOMER"
 *                 status: "ACTIVE"
 *                 isVerified: true
 *                 profileComplete: true
 *                 createdAt: "2026-07-03T09:20:10.000Z"
 *                 updatedAt: "2026-07-03T09:20:10.000Z"
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /admin/users/{userId}/block:
 *   patch:
 *     summary: Block a user
 *     description: Allows an admin to block a user from accessing the platform.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           example: 6878ab12cde3456789012345
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - blockedReason
 *             properties:
 *               blockedReason:
 *                 type: string
 *                 example: Violation of platform policies
 *     responses:
 *       200:
 *         description: User blocked successfully
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
 *                   example: User blocked successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 6878ab12cde3456789012345
 *                     fullName:
 *                       type: string
 *                       example: Deepak B
 *                     email:
 *                       type: string
 *                       example: deepak@gmail.com
 *                     phoneNumber:
 *                       type: string
 *                       example: "9876543210"
 *                     role:
 *                       type: string
 *                       example: CUSTOMER
 *                     status:
 *                       type: string
 *                       example: BLOCKED
 *                     blockedReason:
 *                       type: string
 *                       example: Violation of platform policies
 *                     blockedBy:
 *                       type: string
 *                       example: 6878a111cde3456789011111
 *                     blockedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-07-03T14:10:22.000Z"
 *       400:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Validation failed
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Unauthorized
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Forbidden
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User already blocked
 */
/**
 * @swagger
 * /admin/users/{userId}/unblock:
 *   patch:
 *     summary: Unblock a user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User unblocked successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User unblocked successfully
 *               data:
 *                 _id: "6878ab12cde3456789012345"
 *                 fullName: "Deepak B"
 *                 status: "ACTIVE"
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /admin/restaurants/{restaurantId}:
 *   get:
 *     summary: Get restaurant by ID
 *     description: Returns complete details of a restaurant.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *     responses:
 *       200:
 *         description: Restaurant fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */ 
/**
 * @swagger
 * /admin/delivery-partners/{partnerId}:
 *   get:
 *     summary: Get delivery partner by ID
 *     description: Returns complete details of a delivery partner.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: partnerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery Partner ID
 *     responses:
 *       200:
 *         description: Delivery partner fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /admin/users/{userId}/block:
 *   patch:
 *     summary: Block a user
 *     description: Allows an administrator to block a user from accessing the platform.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           example: 6873b5a2d3f1c45f8b123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - blockedReason
 *             properties:
 *               blockedReason:
 *                 type: string
 *                 example: Violation of community guidelines
 *     responses:
 *       200:
 *         description: User blocked successfully
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
 *                   example: User blocked successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 6873b5a2d3f1c45f8b123456
 *                     fullName:
 *                       type: string
 *                       example: Deepak B
 *                     email:
 *                       type: string
 *                       example: deepak@gmail.com
 *                     phoneNumber:
 *                       type: string
 *                       example: "9876543210"
 *                     role:
 *                       type: string
 *                       example: CUSTOMER
 *                     status:
 *                       type: string
 *                       example: BLOCKED
 *                     blockedReason:
 *                       type: string
 *                       example: Violation of community guidelines
 *                     blockedBy:
 *                       type: string
 *                       example: 6873c0f7d3f1c45f8b987654
 *                     blockedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-07-03T15:45:10.000Z"
 *       400:
 *         description: Validation Error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /admin/delivery-partners/{partnerId}/unblock:
 *   patch:
 *     summary: Unblock a delivery partner
 *     description: Allows an administrator to unblock a delivery partner and restore access.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: partnerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery Partner ID
 *     responses:
 *       200:
 *         description: Delivery partner unblocked successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Delivery partner unblocked successfully
 *               data:
 *                 _id: "6873b5a2d3f1c45f8b123456"
 *                 isBlocked: false
 *                 blockedReason: null
 *                 userId:
 *                   _id: "6873b5a2d3f1c45f8b999999"
 *                   fullName: Rahul Kumar
 *                   email: rahul@gmail.com
 *                   phoneNumber: "9876543210"
 *                   status: ACTIVE
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /admin/orders:
 *   get:
 *     summary: Get all orders
 *     description: Returns a paginated list of all orders in the system. Accessible only by Admin.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of orders per page
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
 *                 message:
 *                   type: string
 *                   example: Orders fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     orders:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "687a3f71f9e3d9d1a1234567"
 *                           customerId:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               fullName:
 *                                 type: string
 *                                 example: Deepak B
 *                               phoneNumber:
 *                                 type: string
 *                                 example: "9876543210"
 *                           restaurantId:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               restaurantName:
 *                                 type: string
 *                                 example: Hotel Saravana Bhavan
 *                           deliveryPartnerId:
 *                             type: object
 *                             nullable: true
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               userId:
 *                                 type: string
 *                           totalAmount:
 *                             type: number
 *                             example: 420
 *                           paymentMethod:
 *                             type: string
 *                             example: COD
 *                           paymentStatus:
 *                             type: string
 *                             example: SUCCESS
 *                           orderStatus:
 *                             type: string
 *                             example: DELIVERED
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2026-07-04T10:15:22.000Z"
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           example: 150
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 10
 *                         totalPages:
 *                           type: integer
 *                           example: 15
 *       400:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Validation failed
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Unauthorized
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Forbidden
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal server error
 */ 
/**
 * @swagger
 * /admin/orders/{orderId}:
 *   get:
 *     summary: Get order by ID
 *     description: Returns complete details of a specific order.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /admin/orders/status/{status}:
 *   get:
 *     summary: Get orders by status
 *     description: Returns a paginated list of orders filtered by their current status.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - PAYMENT_PENDING
 *             - PLACED
 *             - ACCEPTED
 *             - PREPARING
 *             - READY_FOR_PICKUP
 *             - OUT_FOR_DELIVERY
 *             - DELIVERED
 *             - CANCELLED
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *       400:
 *         description: Validation Error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /admin/orders/{orderId}/cancel:
 *   patch:
 *     summary: Cancel an order
 *     description: Allows an administrator to cancel an order before it is delivered.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *           example: 687c3f9de3f7d41a0a123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason
 *             properties:
 *               reason:
 *                 type: string
 *                 example: Restaurant closed due to maintenance
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
 *                   example: Order cancelled successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 687c3f9de3f7d41a0a123456
 *                     orderStatus:
 *                       type: string
 *                       example: CANCELLED
 *                     cancellationReason:
 *                       type: string
 *                       example: Restaurant closed due to maintenance
 *                     cancelledBy:
 *                       type: string
 *                       example: 687c1111e3f7d41a0a654321
 *                     cancelledAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-07-04T16:10:45.000Z"
 *       400:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Validation failed
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Unauthorized
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Forbidden
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Order not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Order cannot be cancelled
 */
/**
 * @swagger
 * /admin/orders/{orderId}/status:
 *   patch:
 *     summary: Update order status
 *     description: Allows an administrator to manually update the status of any order.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *           example: 687c3f9de3f7d41a0a123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderStatus
 *             properties:
 *               orderStatus:
 *                 type: string
 *                 enum:
 *                   - PAYMENT_PENDING
 *                   - PLACED
 *                   - ACCEPTED
 *                   - PREPARING
 *                   - READY_FOR_PICKUP
 *                   - OUT_FOR_DELIVERY
 *                   - DELIVERED
 *                   - CANCELLED
 *                 example: DELIVERED
 *     responses:
 *       200:
 *         description: Order status updated successfully
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
 *                   example: Order status updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 687c3f9de3f7d41a0a123456
 *                     orderStatus:
 *                       type: string
 *                       example: DELIVERED
 *                     pickedUpAt:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                       example: "2026-07-04T17:30:15.000Z"
 *                     deliveredAt:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                       example: "2026-07-04T18:15:30.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-07-04T18:15:30.000Z"
 *       400:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Validation failed
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Unauthorized
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Forbidden
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Order not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal server error
 */
/**
 * @swagger
 * /admin/payments:
 *   get:
 *     summary: Get all payments
 *     description: Returns a paginated list of all payment transactions.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Payments fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /admin/payments/{paymentId}:
 *   get:
 *     summary: Get payment by ID
 *     description: Returns complete details of a payment transaction.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /admin/payments/status/{status}:
 *   get:
 *     summary: Get payments by status
 *     description: Returns a paginated list of payments filtered by payment status.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - PENDING
 *             - SUCCESS
 *             - FAILED
 *             - REFUNDED
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Payments fetched successfully
 *       400:
 *         description: Validation Error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /admin/payments/statistics:
 *   get:
 *     summary: Get payment statistics
 *     description: Returns payment analytics for the admin dashboard.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment statistics fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */