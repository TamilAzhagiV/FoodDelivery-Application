const authService =require("../services/authService");

const register = async (req, res) => {

    try {

        await authService.registerUser(req.body);
        res.status(201).json({
            success:true,
            message:"User registered successfully"
        });

    } catch (err) {
        res.status(400).json({
            success:false,
            message: err.message
        });

    }

};

const login = async (req, res) => {
    try {
        const result = await authService.loginUser(
            req.body.emailOrPhone,
            req.body.password,
            req.body.role
        );

        res.status(200).json({
            success:true,
            message: "Login successful",
            accessToken: result.accessToken,
            refreshToken:result.refreshToken,
            user: result.user
        });

    } catch (err) {
        res.status(400).json({
            success:false,
            message: err.message
        });

    }

};

const logout = async (req, res) => {
    try {
        await authService.logoutUser(req.user.userId);
        res.status(200).json({
            success:true,
            message:"Logout Successful"
        });

    } catch (err) {
        res.status(400).json({
            success:false,
            message: err.message
        });

    }

};

const refresh = async (req, res) => {
    try {
        const refreshToken =req.header("Authorization")?.replace("Bearer ", "").replace(/"/g, "");
        const result =await authService.refreshAccessToken(refreshToken);

        res.status(200).json({
            success:true,
            message:"new Access token generated successfully",
            accessToken:result.accessToken,
            user:result.user

        });

    } 
    catch (err) {
        if (err.name ==="TokenExpiredError") {
            return res.status(401).json({
                success:false,
                message:"Refresh token expired. Please login again."
            });

        }
        res.status(403).json({
            success:false,
            message:err.message
        });

    }

};
const forgotPassword=async(req,res)=>{
    try{
        const result=await authService.forgotPassword(req.body.email);
        res.status(200).json({
            success:true,
            message:result.message
        });
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        });
    }

}

const verifyOtp=async(req,res)=>{
    try{
        await authService.verifyOtp(req.body.email,req.body.otp);
        res.status(200).json({
            success:true,
            message:"OTP Verified Successfully"
        });
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }

}
const resetPassword=async(req,res)=>{
    try{
        const result=await authService.resetPassword(req.body.email,req.body.otp,req.body.newPassword,req.body.confirmPassword);
        res.status(200).json({
            success:true,
            message:result.message
        });
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        });
    }
    
}

const resendOtp=async(req,res)=>{
    try{
        const result=await authService.forgotPassword(req.body.email);
        res.status(200).json({
            success:true,
            message:result.message
        });
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        });
    }

}

module.exports = {
    register,
    login,
    logout,
    refresh,
    forgotPassword,
    verifyOtp,
    resetPassword,
    resendOtp
};