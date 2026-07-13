/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: Public Restaurant Discovery and Search APIs
 */

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Get All Restaurants
 *     description: Retrieve all approved restaurants. Requires authentication.
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Restaurants retrieved successfully
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
 */

/**
 * @swagger
 * /restaurants/{restaurantId}:
 *   get:
 *     summary: Get Restaurant By ID
 *     description: Retrieve detailed information about a specific restaurant by its ID. Requires authentication.
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the restaurant
 *     responses:
 *       200:
 *         description: Restaurant details retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Restaurant not found
 */

/**
 * @swagger
 * /restaurants/{restaurantId}/menu:
 *   get:
 *     summary: Get Restaurant Menu
 *     description: Retrieve the menu of a specific restaurant. Does not require authentication.
 *     tags: [Restaurants]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the restaurant
 *     responses:
 *       200:
 *         description: Restaurant menu retrieved successfully
 *       404:
 *         description: Restaurant or menu not found
 */

/**
 * @swagger
 * /restaurants/search/menu:
 *   get:
 *     summary: Search Menu Items
 *     description: Search menu items across all restaurants by name/keyword. Does not require authentication.
 *     tags: [Restaurants]
 *     security: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *         description: Keyword to search for (e.g. pizza)
 *     responses:
 *       200:
 *         description: Menu items matching keyword retrieved successfully
 *       500:
 *         description: Server error
 */
