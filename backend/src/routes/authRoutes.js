const express = require("express");
const {register,login,logout,refresh,forgotPassword,verifyOtp,resetPassword,resendOtp} = require("../controllers/authController");
const authMiddleware =require("../middleware/authMiddleware");
const validate =require("../middleware/validate");
const {registerSchema,loginSchema,logoutSchema,refreshSchema,forgotPasswordSchema,verifyOtpSchema,resetPasswordSchema,resendOtpSchema} = require("../validations/auth/auth.request");
const router = express.Router();



router.post("/register",validate(registerSchema),register);
router.post("/login",validate(loginSchema),login);
router.post("/logout",authMiddleware,validate(logoutSchema),logout);
router.post("/refresh",validate(refreshSchema),refresh);
router.post("/forgot-password",validate(forgotPasswordSchema),forgotPassword);
router.post("/verify-otp",validate(verifyOtpSchema),verifyOtp);
router.post("/reset-password",validate(resetPasswordSchema),resetPassword);
router.post("/resend-otp",validate(resendOtpSchema),resendOtp);

module.exports = router;