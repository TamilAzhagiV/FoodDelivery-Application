const express = require("express");
const {register,login,logout,refresh,forgotPassword,verifyOtp,resetPassword,resendOtp}=require("../controller/authController");
const authMiddleware = require("../middleware/authmiddleware");
const validate=require('../middleware/validate');
const {registerSchema} = require("../validations/authValidation");


const router=express.Router();

router.post('/register',validate(registerSchema),register);
router.post('/login',login);
router.post('/logout',authMiddleware,logout);
router.post('/refresh',refresh);
router.post('/forgot-password',forgotPassword)
router.post('/verify-otp',verifyOtp);
router.post('/reset-password',resetPassword);
router.post('/resend-otp',resendOtp);

module.exports=router;