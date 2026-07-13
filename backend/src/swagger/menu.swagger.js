/**
 * @swagger
 * tags:
 *   name: Menu Management
 *   description: Menu Management APIs for Restaurant Owners
 */

/**
 * @swagger
 * /menu:
 *   post:
 *     summary: Create Menu Item
 *     description: Create a new menu item for the owner's restaurant.
 *     tags: [Menu Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Margherita Pizza
 *               description:
 *                 type: string
 *                 example: Classic cheese and tomato sauce pizza
 *               category:
 *                 type: string
 *                 example: Pizza
 *               price:
 *                 type: number
 *                 example: 299
 *               image:
 *                 type: string
 *                 example: https://example.com/pizza.jpg
 *               isVeg:
 *                 type: boolean
 *                 default: false
 *                 example: true
 *               isAvailable:
 *                 type: boolean
 *                 default: true
 *                 example: true
 *     responses:
 *       201:
 *         description: Menu item created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Restaurant Owner role required
 */

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Get Restaurant Menu
 *     description: Retrieve all menu items for the logged-in restaurant owner's restaurant.
 *     tags: [Menu Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Menu items fetched successfully
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
 * /menu/{menuItemId}:
 *   get:
 *     summary: Get Menu Item By ID
 *     description: Retrieve a specific menu item by its ID.
 *     tags: [Menu Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: menuItemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the menu item
 *     responses:
 *       200:
 *         description: Menu item fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Menu item not found
 */

/**
 * @swagger
 * /menu/{menuItemId}:
 *   put:
 *     summary: Update Menu Item
 *     description: Update details of a specific menu item.
 *     tags: [Menu Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: menuItemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the menu item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Margherita Pizza Deluxe
 *               description:
 *                 type: string
 *                 example: Classic cheese and tomato sauce pizza with extra cheese
 *               category:
 *                 type: string
 *                 example: Pizza
 *               price:
 *                 type: number
 *                 example: 349
 *               image:
 *                 type: string
 *                 example: https://example.com/pizza_deluxe.jpg
 *               isVeg:
 *                 type: boolean
 *                 example: true
 *               isAvailable:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Menu item not found
 */

/**
 * @swagger
 * /menu/{menuItemId}:
 *   delete:
 *     summary: Delete Menu Item
 *     description: Delete a specific menu item.
 *     tags: [Menu Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: menuItemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the menu item to delete
 *     responses:
 *       200:
 *         description: Menu item deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Menu item not found
 */
