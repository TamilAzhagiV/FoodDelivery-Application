const Restaurant=require('../models/Restaurant');
const DeliveryPartner=require('../models/DeliveryPartner');

const getAllDeliveryPartners=async()=>{
    const partners=await DeliveryPartner.find().
    populate(
        "userId",
        "fullName email phoneNumber"
    );

    return partners;
}
const getPendingDeliveryPartners=async()=>{
    const partners=await DeliveryPartner.find({
        isProfileCompleted:true,
        approvalStatus:"PENDING"
    }).populate(
        "userId",
        "fullName email phoneNumber"
    ).sort({createdAt:-1});
    
    return partner;
}

const approveDeliveryPartner=async(partnerId,adminID)=>{
    const partner=await DeliveryPartner.findById(partnerId);
    if(!partner){
        throw new Error("Delivery-Partner not found");
    }
    partner.approvalStatus="APPROVED";
    partner.approvedBy=adminId;
    partner.approvedAt=new Date();
    partner.isVerified=true;

    await partner.save();
    
    return partner;
}

const rejectDeliveryPartner=async(partnerId,adminId,rejectionReason)=>{
    const partner =await DeliveryPartner.findById(partnerId);
    if(!partner){
        throw new Error("Delivery-Partner not found")
    }
    partner.approvalStatus="REJECTED";
    partner.approvedBy=admin;
    partner.approvedAt=new Date();
    partner.rejectionReason=rejectionReason;
    await partner.save();
    return partner;
}

const getPendingRestaurants=async()=>{
    const restaurants=await Restaurant.find({
        profileStatus:"COMPLETED",
        approvalStatus:"PENDING"
    }).populate(
        "ownerId",
        "fullName email phoneNumber"
    );
    return restaurants;
}

const getAllRestaurants=async()=>{
    const restaurants=await Restaurant.find().
    populate(
        "ownerId",
        "fullName email phoneNumber"

    )
    .sort({createdAt:-1});
    return restaurants
}

const approveRestaurant = async (restaurantId,adminId) => {

    const restaurant =await Restaurant.findById(restaurantId);

    if (!restaurant) {
        throw new Error("Restaurant not found");
    }
    restaurant.approvalStatus ="APPROVED";
    restaurant.approvedBy =adminId;
    restaurant.approvedAt =new Date();

    await restaurant.save();
    return restaurant;
};

const rejectRestaurant= async (restaurantId,adminId,rejectionReason) => {

    const restaurant =await Restaurant.findById(restaurantId);

    if (!restaurant) {
        throw new Error("Restaurant not found");
    }

    restaurant.approvalStatus ="REJECTED";
    restaurant.rejectedBy =adminId;
    restaurant.rejectedAt =new Date();
    restaurant.rejectionReason =rejectionReason;
    await restaurant.save();
    return restaurant;
};

module.exports = {
    getPendingRestaurants,
    getAllRestaurants,
    approveRestaurant,
    rejectRestaurant,

    getAllDeliveryPartners,
    getPendingDeliveryPartners,
    approveDeliveryPartner,
    rejectDeliveryPartner
}