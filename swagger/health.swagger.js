/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Application Health Check API
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Check API Health Status
 *     tags: [Health]
 *     description: Returns the current status of the Food Delivery API.
 *     responses:
 *       200:
 *         description: API is running successfully
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
 *                   example: Food Delivery API Running
 */