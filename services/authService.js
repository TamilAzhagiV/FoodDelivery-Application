const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const redisClient=require('../config/redis');
const transporter =require("../config/mail");
const CustomerProfile=require('../models/CustomerProfile');
const DeliveryPartner=require("../models/DeliveryPartner");
const Restaurant=require("../models/Restaurant");


const registerUser = async (userData) => {

    const { fullName,email,password,phoneNumber,role } = userData;

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
        throw new Error("Email already exists");
    }

    const existingPhone =await User.findOne({phoneNumber});

    if (existingPhone) {
        throw new Error("Phone number already exists");
    }

    const hashedPassword =await bcrypt.hash(password, 10);

    const user = new User({fullName,email,phoneNumber,password: hashedPassword,role});

    await user.save();
    if(role==='CUSTOMER'){
        await CustomerProfile.create({
            userId:user._id
        })
    }
    

    return user;
};

const loginUser = async (
    emailOrPhone,
    password,
    role
) => {

    const user = await User.findOne({
        $or: [
            { email: emailOrPhone },
            { phoneNumber: emailOrPhone }
        ]
    });

    if (!user) {
        throw new Error("Invalid email/phoneNumber or password");
    }

    const isMatch =
        await bcrypt.compare(password,user.password);

    if (!isMatch) {
        throw new Error("Invalid email/phoneNumber or password");
    }

    if (user.role !== role) {
        throw new Error("Invalid role");
    }

    const accessToken =
        jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );

    const refreshToken =
        jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_REFRESH,
            {
                expiresIn: "7d"
            }
        );

    user.refreshToken =refreshToken;

    await user.save();

    return {
        accessToken,
        refreshToken,
        user
    };
};

const logoutUser = async (userId) => {

    const user =await User.findById(userId);

    if (!user) {
        throw new Error("User Not Found");
    }

    user.refreshToken = null;

    await user.save();
};

const refreshAccessToken =async (refreshToken) => {

    if (!refreshToken) {
        throw new Error("Refresh Token Required");
    }

    const user =await User.findOne({ refreshToken });

    if (!user) {
        throw new Error("Invalid Refresh Token");
    }

    jwt.verify(refreshToken,process.env.JWT_REFRESH);

    const accessToken =
        jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );

    return {
        accessToken,
        user
    };
};

const forgotPassword=async(email)=>{
    const user=await User.findOne({email});
    if(!user){
        throw new Error("User not found");
    }
    const otp=Math.floor(100000+Math.random()*900000).toString();
    await redisClient.set(
        `otp:${email}`,
        otp,
        {
            EX:600
        }
    );
    await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to:email,
        subject:"Password Reset OTP",
        html: `
            <h2>Food Delivery App </h2>
            <p>Your OTP is:</p>
            <h1>${otp}</h1>
            <p> This OTP is valid for 10 minutes.</p>`
    });
    return {
        message:"OTP Send Successfully"

    }

}

const verifyOtp=async(email,otp)=>{
    const storedOtp=await redisClient.get(`otp:${email}`);
    if(!storedOtp){
        throw new Error("OTP Expired");
    }
    if(storedOtp!=otp){
        throw new Error("Invalid OTP");
    }
    return true;
}

const resetPassword=async(email,otp,newPassword,confirmPassword)=>{
    if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
    }
    const storedOtp=await redisClient.get(`otp:${email}`);
    if(!storedOtp){
        throw new Error("OTP EXPIRED");
    }
    if(storedOtp!=otp){
        throw new Error("INVALID OTP");
    };
    const user=await User.findOne({email});
    if(!user){
        throw new Error("User Not Found");
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    if(!passwordRegex.test(newPassword)){
        throw new Error("Password must contain uppercase, lowercase, number and special character");
    }
    const hashPassword=await bcrypt.hash(newPassword,10);
    user.password=hashPassword;
    console.log(hashPassword)
    await user.save();
    console.log(user.password);
    await redisClient.del(
        `otp:${email}`
    );
    return {
        message:"Password Reset Successfully"
    }
}

const resendOtp=async(email)=>{
    const user=await User.findOne({email});
    if(!user){
        throw new Error("User not found");
    }
    const otp=Math.floor(100000+Math.random()*900000).toString();
    await redisClient.set(
        `otp:${email}`,
        otp,
        {
            EX:600
        }
    );
    await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to:email,
        subject:"Password Reset OTP",
        html: `
            <h2>Food Delivery App </h2>
            <p>Your OTP is:</p>
            <h1>${otp}</h1>
            <p> This OTP is valid for 10 minutes.</p>`
    });
    return {
        message:"OTP Send Successfully"

    }

}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    forgotPassword,
    verifyOtp,
    resetPassword,
    resendOtp
};