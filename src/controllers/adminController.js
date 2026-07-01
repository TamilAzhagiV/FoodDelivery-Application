const adminService=require('../services/adminService');
const DeliveryPartner = require('../models/DeliveryPartner');

const getPendingRestaurants=async(req,res)=>{
    try{
         const restaurants=await adminService.getPendingRestaurants();
         return res.status(200).json({
            success:true,
            data:restaurants
    })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }   
}

const approveRestaurant=async(req,res)=>{
    try{
        const restaurant=await adminService.approveRestaurant(
            req.params.restaurantId,
            req.user.userId
        );
        return res.status(200).json({
            success:true,
            message:"Restaurant approved successfully",
            data:restaurant

        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const rejectRestaurant=async(req,res)=>{
    try{
        const restaurant =
            await adminService.rejectRestaurant(
                req.params.restaurantId,
                req.user.userId,
                req.body.rejectionReason
            );

        res.status(200).json({
            success: true,
            message: "Restaurant rejected successfully",
            data: restaurant
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message   
        })
    }
}

const getAllRestaurants=async(req,res)=>{
    try{
         const restaurants=await adminService.getAllRestaurants();
         res.status(200).json({
            success:true,
            data:restaurants
         })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
   

}

const getAllDeliveryPartners=async(req,res)=>{
    try{
        const partners=await adminService.getAllDeliveryPartners();
        res.status(200).json({
            success:true,
            data:partners
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
const getPendingDeliveryPartners=async(req,res)=>{
    try{
        const partners=await adminService.getPendingDeliveryPartners();
        console.log(partners);
        res.status(200).json({
            success:true,
            data:partners
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }  
}

const approveDeliveryPartner=async(req,res)=>{
    try{
        const partner=await adminService.approveDeliveryPartner(
            req.params.partnerId,
            req.user.userId
        )
        res.status(200).json({
            success:true,
            data:partner
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const rejectDeliveryPartner=async(req,res)=>{
    try{
        const partner=await adminService.rejectDeliveryPartner(
            req.params.partnerId,
            req.user.userId,
            req.body.rejectionReason
        )
        res.status(200).json({
            success:true,
            data:partner
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports={
    getPendingRestaurants,
    approveRestaurant,
    rejectRestaurant,
    getAllRestaurants,

    getAllDeliveryPartners,
    getPendingDeliveryPartners,
    approveDeliveryPartner,
    rejectDeliveryPartner
}