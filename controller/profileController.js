const profileService=require('../services/profileService');
const getProfile=async(req,res)=>{
    try{
        const profile=await profileService.getProfile(req.user.userId);
        res.status(200).json({
            success:true,
            data:profile
        })

    }
    catch(error){
        res.status(404).json({
            success:false,
            message:error.message
        })
    }
}
const updateProfile=async(req,res)=>{
    try{
        
        const profile=await profileService.updateProfile(req.user.userId,req.body);
        res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            data:profile
        });

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports={
    getProfile,
    updateProfile
}