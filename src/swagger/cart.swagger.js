/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart Management APIs
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get Cart
 *     description: Retrieve the current customer's cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     customerId:
 *                       type: string
 *                       example: "6850c1c6f3a5f5f4b6a12345"
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           menuItemId:
 *                             type: string
 *                             example: "6850c1c6f3a5f5f4b6a12347"
 *                           quantity:
 *                             type: integer
 *                             example: 2
 *                           price:
 *                             type: number
 *                             example: 250
 *                     totalAmount:
 *                       type: number
 *                       example: 500
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Customer role required
 */

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add Item to Cart
 *     description: Add a menu item to the cart or increment its quantity.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - menuItemId
 *             properties:
 *               menuItemId:
 *                 type: string
 *                 example: "6850c1c6f3a5f5f4b6a12347"
 *               quantity:
 *                 type: integer
 *                 default: 1
 *                 example: 2
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /cart/item/{menuItemId}:
 *   put:
 *     summary: Update Cart Item Quantity
 *     description: Update the quantity of a specific menu item in the cart.
 *     tags: [Cart]
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
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Item not found in cart
 */

/**
 * @swagger
 * /cart/item/{menuItemId}:
 *   delete:
 *     summary: Remove Item from Cart
 *     description: Remove a specific menu item completely from the cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: menuItemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the menu item to remove
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Item not found in cart
 */

/**
 * @swagger
 * /cart/clear:
 *   delete:
 *     summary: Clear Cart
 *     description: Remove all items from the customer's cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
