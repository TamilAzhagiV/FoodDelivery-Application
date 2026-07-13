/**
 * @swagger
 * /admin/coupons:
 *   post:
 *     summary: Create a new coupon
 *     description: Allows an administrator to create a new coupon that customers can apply during checkout.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - title
 *               - description
 *               - discountType
 *               - discountValue
 *               - startDate
 *               - expiryDate
 *               - usageLimit
 *             properties:
 *               code:
 *                 type: string
 *                 example: WELCOME50
 *               title:
 *                 type: string
 *                 example: Welcome Offer
 *               description:
 *                 type: string
 *                 example: Flat ₹50 off on your first order.
 *               discountType:
 *                 type: string
 *                 enum:
 *                   - FLAT
 *                   - PERCENTAGE
 *                 example: FLAT
 *               discountValue:
 *                 type: number
 *                 example: 50
 *               minimumOrderAmount:
 *                 type: number
 *                 example: 299
 *               maximumDiscount:
 *                 type: number
 *                 nullable: true
 *                 example: null
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-07-15T00:00:00.000Z"
 *               expiryDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-12-31T23:59:59.000Z"
 *               usageLimit:
 *                 type: integer
 *                 example: 1000
 *     responses:
 *       201:
 *         description: Coupon created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Coupon created successfully
 *               data:
 *                 _id: 687c3f9de3f7d41a0a123456
 *                 code: WELCOME50
 *                 title: Welcome Offer
 *                 description: Flat ₹50 off on your first order.
 *                 discountType: FLAT
 *                 discountValue: 50
 *                 minimumOrderAmount: 299
 *                 maximumDiscount: null
 *                 startDate: "2026-07-15T00:00:00.000Z"
 *                 expiryDate: "2026-12-31T23:59:59.000Z"
 *                 usageLimit: 1000
 *                 usedCount: 0
 *                 isActive: true
 *                 createdBy: 687b1234e3f7d41a0a111111
 *                 createdAt: "2026-07-10T10:00:00.000Z"
 *                 updatedAt: "2026-07-10T10:00:00.000Z"
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
 *               message: Invalid Token
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Forbidden
 *       409:
 *         description: Coupon code already exists
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Coupon code already exists
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
 * /api/admin/coupons:
 *   get:
 *     summary: Get all coupons
 *     description: Retrieves a paginated list of all coupons created by administrators.
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
 *         description: Number of coupons per page
 *     responses:
 *       200:
 *         description: Coupons retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 coupons:
 *                   - _id: "687c3f9de3f7d41a0a123456"
 *                     code: "WELCOME50"
 *                     title: "Welcome Offer"
 *                     description: "Flat ₹50 off on your first order."
 *                     discountType: "FLAT"
 *                     discountValue: 50
 *                     minimumOrderAmount: 299
 *                     maximumDiscount: null
 *                     startDate: "2026-07-15T00:00:00.000Z"
 *                     expiryDate: "2026-12-31T23:59:59.000Z"
 *                     usageLimit: 1000
 *                     usedCount: 120
 *                     isActive: true
 *                     createdBy:
 *                       _id: "687b1234e3f7d41a0a111111"
 *                       fullName: "Admin User"
 *                       email: "admin@example.com"
 *                     createdAt: "2026-07-10T10:00:00.000Z"
 *                     updatedAt: "2026-07-10T10:00:00.000Z"
 *                 pagination:
 *                   total: 25
 *                   page: 1
 *                   limit: 10
 *                   totalPages: 3
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Invalid Token
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
 * /api/admin/coupons/{couponId}:
 *   get:
 *     summary: Get coupon by ID
 *     description: Retrieves complete details of a specific coupon.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: couponId
 *         required: true
 *         schema:
 *           type: string
 *         description: Coupon ID
 *         example: 687c3f9de3f7d41a0a123456
 *     responses:
 *       200:
 *         description: Coupon retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 _id: "687c3f9de3f7d41a0a123456"
 *                 code: "WELCOME50"
 *                 title: "Welcome Offer"
 *                 description: "Flat ₹50 off on your first order."
 *                 discountType: "FLAT"
 *                 discountValue: 50
 *                 minimumOrderAmount: 299
 *                 maximumDiscount: null
 *                 startDate: "2026-07-15T00:00:00.000Z"
 *                 expiryDate: "2026-12-31T23:59:59.000Z"
 *                 usageLimit: 1000
 *                 usedCount: 120
 *                 isActive: true
 *                 createdBy:
 *                   _id: "687b1234e3f7d41a0a111111"
 *                   fullName: "Admin User"
 *                   email: "admin@example.com"
 *                 createdAt: "2026-07-10T10:00:00.000Z"
 *                 updatedAt: "2026-07-10T10:00:00.000Z"
 *       400:
 *         description: Invalid coupon ID
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Invalid Coupon Id
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Invalid Token
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Forbidden
 *       404:
 *         description: Coupon not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Coupon not found
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
 * /api/admin/coupons/{couponId}:
 *   patch:
 *     summary: Update coupon
 *     description: Allows an administrator to update an existing coupon.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: couponId
 *         required: true
 *         schema:
 *           type: string
 *         description: Coupon ID
 *         example: 687c3f9de3f7d41a0a123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: WELCOME100
 *               title:
 *                 type: string
 *                 example: Updated Welcome Offer
 *               description:
 *                 type: string
 *                 example: Flat ₹100 off on your first order.
 *               discountType:
 *                 type: string
 *                 enum:
 *                   - FLAT
 *                   - PERCENTAGE
 *               discountValue:
 *                 type: number
 *                 example: 100
 *               minimumOrderAmount:
 *                 type: number
 *                 example: 499
 *               maximumDiscount:
 *                 type: number
 *                 nullable: true
 *                 example: null
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-07-15T00:00:00.000Z"
 *               expiryDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-12-31T23:59:59.000Z"
 *               usageLimit:
 *                 type: integer
 *                 example: 2000
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Coupon updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Coupon updated successfully
 *               data:
 *                 _id: "687c3f9de3f7d41a0a123456"
 *                 code: "WELCOME100"
 *                 title: "Updated Welcome Offer"
 *                 description: "Flat ₹100 off on your first order."
 *                 discountType: "FLAT"
 *                 discountValue: 100
 *                 minimumOrderAmount: 499
 *                 maximumDiscount: null
 *                 startDate: "2026-07-15T00:00:00.000Z"
 *                 expiryDate: "2026-12-31T23:59:59.000Z"
 *                 usageLimit: 2000
 *                 usedCount: 120
 *                 isActive: true
 *                 createdBy:
 *                   _id: "687b1234e3f7d41a0a111111"
 *                   fullName: "Admin User"
 *                   email: "admin@example.com"
 *                 createdAt: "2026-07-10T10:00:00.000Z"
 *                 updatedAt: "2026-07-15T12:30:00.000Z"
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
 *               message: Invalid Token
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Forbidden
 *       404:
 *         description: Coupon not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Coupon not found
 *       409:
 *         description: Coupon code already exists
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Coupon code already exists
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
 * /api/admin/coupons/{couponId}:
 *   delete:
 *     summary: Deactivate coupon
 *     description: Soft deletes a coupon by marking it as inactive.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: couponId
 *         required: true
 *         schema:
 *           type: string
 *         description: Coupon ID
 *         example: 687c3f9de3f7d41a0a123456
 *     responses:
 *       200:
 *         description: Coupon deactivated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Coupon deactivated successfully
 *               data:
 *                 _id: "687c3f9de3f7d41a0a123456"
 *                 code: "WELCOME50"
 *                 isActive: false
 *       400:
 *         description: Coupon is already inactive
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Coupon is already inactive
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Internal Server Error
 */