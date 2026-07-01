const Restaurant=require("../models/Restaurant");
const MenuItem=require("../models/MenuItem");

const getAllRestaurants=async()=>{
    const restaurants=await Restaurant.find({
        approvalStatus:"APPROVED",
        isActive:true
    }).populate("ownerId","fullName email phoneNumber");

    return restaurants;
}

const getRestaurantById = async (restaurantId) => {

    const restaurant =await Restaurant.findById(restaurantId).populate(
            "ownerId",
            "fullName email phoneNumber");

    if (!restaurant) {
        throw new Error("Restaurant not found");
    }
    return restaurant;
};

const getRestaurantMenu=async(restaurantId)=>{
    const restaurant=await Restaurant.findById(restaurantId);
    if(!restaurant){
        throw new Error("Restaurant not found")
    }

    return await MenuItem.find({
        restaurantId
    })
}
const searchMenuItems = async (keyword) => {

    if (!keyword) {
        throw new Error("Keyword is required");
    }

    const menuItems = await MenuItem.find({
        name: {
            $regex: keyword,
            $options: "i"
        },
        isAvailable: true
    }).populate(
        "restaurantId",
        "restaurantName"
    );

    return menuItems;
};

module.exports={
    getAllRestaurants,
    getRestaurantById,
    getRestaurantMenu,
    searchMenuItems
}