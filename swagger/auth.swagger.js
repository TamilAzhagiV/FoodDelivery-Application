/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register User
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - phoneNumber
 *               - password
 *               - role
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Deepak
 *               email:
 *                 type: string
 *                 example: deepak@gmail.com
 *               phoneNumber:
 *                 type: string
 *                 example: 9876543210
 *               password:
 *                 type: string
 *                 example: Deepak@123
 *               role:
 *                 type: string
 *                 example: CUSTOMER
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emailOrPhone
 *               - password
 *               - role
 *             properties:
 *               emailOrPhone:
 *                 type: string
 *                 example: deepak@gmail.com
 *               password:
 *                 type: string
 *                 example: Deepak@123
 *               role:
 *                 type: string
 *                 example: CUSTOMER
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout User
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh Access Token
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: New access token generated
 *       401:
 *         description: Refresh token expired
 *       403:
 *         description: Invalid refresh token
 */
/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Send OTP to Email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: deepak@gmail.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: User not found
 */
/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 example: deepak@gmail.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP Verified Successfully
 *       400:
 *         description: Invalid OTP or OTP Expired
 */
/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset Password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               email:
 *                 type: string
 *                 example: deepak@gmail.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *               newPassword:
 *                 type: string
 *                 example: Deepak@123
 *               confirmPassword:
 *                 type: string
 *                 example: Deepak@123
 *     responses:
 *       200:
 *         description: Password Reset Successfully
 *       400:
 *         description: Invalid OTP, Password Mismatch, or OTP Expired
 */
/**
 * @swagger
 * /auth/resend-otp:
 *   post:
 *     summary: Resend OTP
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: deepak@gmail.com
 *     responses:
 *       200:
 *         description: OTP resent successfully
 *       400:
 *         description: User not found
 */