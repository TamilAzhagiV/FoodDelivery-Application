/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin Management APIs
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
 *     responses:
 *       200:
 *         description: Restaurant approved successfully
 */

/**
 * @swagger
 * /admin/restaurants/{restaurantId}/reject:
 *   patch:
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rejectionReason:
 *                 type: string
 *                 example: Invalid GST Number
 *     responses:
 *       200:
 *         description: Restaurant rejected successfully
 */