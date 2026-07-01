/**
 * @swagger
 * tags:
 *   name: Restaurant Reviews
 *   description: Restaurant Review APIs
 */

/**
 * @swagger
 * /restaurant-reviews:
 *   post:
 *     summary: Submit Restaurant Review
 *     description: Customer can submit a review only for a delivered order.
 *     tags: [Restaurant Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - rating
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "6850c1c6f3a5f5f4b6a12345"
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               review:
 *                 type: string
 *                 example: "Food quality was excellent."
 *     responses:
 *       201:
 *         description: Restaurant review submitted successfully
 *       400:
 *         description: Invalid request / Already reviewed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /restaurant-reviews:
 *   get:
 *     summary: Get Restaurant Reviews
 *     description: Restaurant owner can view all reviews of their restaurant.
 *     tags: [Restaurant Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reviews fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /restaurant-reviews/{reviewId}:
 *   get:
 *     summary: Get Restaurant Review By Id
 *     description: Get a specific restaurant review.
 *     tags: [Restaurant Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant Review Id
 *     responses:
 *       200:
 *         description: Review fetched successfully
 *       404:
 *         description: Review not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /restaurant-reviews/{reviewId}:
 *   put:
 *     summary: Update Restaurant Review
 *     description: Customer can update their restaurant review.
 *     tags: [Restaurant Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant Review Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *               review:
 *                 type: string
 *                 example: "Food was good."
 *     responses:
 *       200:
 *         description: Restaurant review updated successfully
 *       404:
 *         description: Review not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /restaurant-reviews/{reviewId}:
 *   delete:
 *     summary: Delete Restaurant Review
 *     description: Customer can delete their restaurant review.
 *     tags: [Restaurant Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant Review Id
 *     responses:
 *       200:
 *         description: Restaurant review deleted successfully
 *       404:
 *         description: Review not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server Error
 */