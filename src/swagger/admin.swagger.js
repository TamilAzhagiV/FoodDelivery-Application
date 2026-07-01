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