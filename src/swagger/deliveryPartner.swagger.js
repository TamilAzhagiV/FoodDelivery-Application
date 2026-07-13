/**
 * @swagger
 * tags:
 *   name: Delivery Partner
 *   description: Delivery Partner APIs
 */

/**
 * @swagger
 * /delivery-partner/status:
 *   patch:
 *     summary: Update availability status
 *     tags: [Delivery Partner]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - availabilityStatus
 *             properties:
 *               availabilityStatus:
 *                 type: string
 *                 enum:
 *                   - ONLINE
 *                   - OFFLINE
 *                   - BUSY
 *     responses:
 *       200:
 *         description: Availability updated successfully
 */

/**
 * @swagger
 * /delivery-partner/current-order:
 *   get:
 *     summary: Get current delivery order
 *     tags: [Delivery Partner]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current order fetched successfully
 */

/**
 * @swagger
 * /delivery-partner/history:
 *   get:
 *     summary: Get delivery history
 *     tags: [Delivery Partner]
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
 *         description: Delivery history fetched successfully
 */

/**
 * @swagger
 * /delivery-partner/history/{orderId}:
 *   get:
 *     summary: Get delivery history by order id
 *     tags: [Delivery Partner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Delivery history fetched successfully
 */

/**
 * @swagger
 * /delivery-partner/current-location:
 *   patch:
 *     summary: Update current location
 *     tags: [Delivery Partner]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - latitude
 *               - longitude
 *             properties:
 *               latitude:
 *                 type: number
 *                 example: 11.0168
 *               longitude:
 *                 type: number
 *                 example: 76.9558
 *     responses:
 *       200:
 *         description: Current location updated successfully
 */

/**
 * @swagger
 * /delivery-partner/earnings:
 *   get:
 *     summary: Get delivery partner earnings
 *     tags: [Delivery Partner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum:
 *             - today
 *             - week
 *             - month
 *             - lifetime
 *           default: today
 *     responses:
 *       200:
 *         description: Earnings fetched successfully
 */

/**
 * @swagger
 * /delivery-partner/statistics:
 *   get:
 *     summary: Get delivery partner statistics
 *     tags: [Delivery Partner]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics fetched successfully
 */

/**
 * @swagger
 * /delivery-partner/dashboard:
 *   get:
 *     summary: Get delivery partner dashboard
 *     tags: [Delivery Partner]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard fetched successfully
 */