/**
 * @swagger
 * tags:
 *   name: Delivery Reviews
 *   description: Delivery Review APIs
 */

/**
 * @swagger
 * /delivery-reviews:
 *   post:
 *     summary: Submit Delivery Review
 *     description: Customer can submit a delivery review only for a delivered order.
 *     tags: [Delivery Reviews]
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
 *               - ratings
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "6850c1c6f3a5f5f4b6a12345"
 *               ratings:
 *                 type: object
 *                 properties:
 *                   deliveryTime:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *                     example: 5
 *                   behaviour:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *                     example: 5
 *                   professionalism:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *                     example: 4
 *                   communication:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *                     example: 5
 *                   overallExperience:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *                     example: 5
 *               review:
 *                 type: string
 *                 example: "Delivery was very fast and professional."
 *     responses:
 *       201:
 *         description: Delivery review submitted successfully
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
 * /delivery-reviews:
 *   get:
 *     summary: Get Delivery Reviews
 *     description: Delivery partner can view all reviews received.
 *     tags: [Delivery Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Delivery reviews fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /delivery-reviews/{reviewId}:
 *   get:
 *     summary: Get Delivery Review By Id
 *     description: Get a specific delivery review.
 *     tags: [Delivery Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery Review Id
 *     responses:
 *       200:
 *         description: Delivery review fetched successfully
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
 * /delivery-reviews/{reviewId}:
 *   put:
 *     summary: Update Delivery Review
 *     description: Customer can update their delivery review.
 *     tags: [Delivery Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery Review Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ratings
 *             properties:
 *               ratings:
 *                 type: object
 *                 properties:
 *                   deliveryTime:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *                     example: 5
 *                   behaviour:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *                     example: 4
 *                   professionalism:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *                     example: 5
 *                   communication:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *                     example: 4
 *                   overallExperience:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *                     example: 5
 *               review:
 *                 type: string
 *                 example: "Delivery was excellent."
 *     responses:
 *       200:
 *         description: Delivery review updated successfully
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
 * /delivery-reviews/{reviewId}:
 *   delete:
 *     summary: Delete Delivery Review
 *     description: Customer can delete their delivery review.
 *     tags: [Delivery Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery Review Id
 *     responses:
 *       200:
 *         description: Delivery review deleted successfully
 *       404:
 *         description: Review not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server Error
 */