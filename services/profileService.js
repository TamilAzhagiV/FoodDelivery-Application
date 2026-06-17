const User=require('../models/User');
const CustomerProfile=require('../models/CustomerProfile');
const Restaurant=require('../models/Restaurant');
const DeliveryPartner=require('../models/DeliveryPartner');

const getProfile=async(userId)=>{
    const user=await User.findById(userId);
    if(!user){
        throw new Error("User not found");
    }
    switch(user.role){
        case "CUSTOMER":
            return await CustomerProfile.findOne({userId});
        case "RESTAURANT_OWNER":
            return await Restaurant.findOne({
                ownerId:userId
            });
        case "DELIVERY_PARTNER":
            return await DeliveryPartner.findOne({userId});
        case "ADMIN":
            return user;
    }
};

const updateProfile=async(userId,profileData)=>{
    const user=await User.findById(userId);
    if(!user){
        throw new Error("User not found");
    }
    switch(user.role){
        case "CUSTOMER":
            return await CustomerProfile.findOneAndUpdate(
                {userId},
                profileData,
                {
                    new:true,
                    runValidators:true
                }
            );
        case "RESTAURANT_OWNER":
            return await Restaurant.findOneAndUpdate(
                {ownerId:userId},
                profileData,
                {
                    new:true,
                    upsert: true,
                    runValidators:true
                }

            )
        case "DELIVERY_PARTNER":
            return await DeliveryPartner.findOneAndUpdate(
                {userId},
                profileData,
                {
                    new:true,
                    upsert: true,
                    runValidators:true
                }
            )
        default:
            throw new Error("Invalid role")
    }

}
module.exports={
    getProfile,
    updateProfile
}