    const MenuItem=require("../models/MenuItem");
    const Restaurant=require("../models/Restaurant");

    const createMenuItem=async(userId,menuData)=>{
        const restaurant=await Restaurant.findOne({
            ownerId:userId
        });
        if(!restaurant){
            throw new Error("Restaurant not found");
        }

        const menuItem=await MenuItem.create({
            ...menuData,
            restaurantId:restaurant._id
        });

        return menuItem;
    }

    const getRestaurantMenu=async(userId)=>{

        const restaurant=await Restaurant.findOne({
            ownerId:userId
        });
        
        if(!restaurant){
            throw new Error("Restaurant not found");
        }

        return await MenuItem.find({
            restaurantId:restaurant._id
        }).sort({createdAt:-1});
    }
    const getMenuItemById=async(menuItemId)=>{
        const menuItem=await MenuItem.findById(menuItemId);

        if(!menuItem){
            throw new Error("Menu item not found");
        }
        return menuItem;
    }

    const updateMenuItem=async(menuItemId,updateData)=>{
        
        const menuItem=await MenuItem.findByIdAndUpdate(
            menuItemId,
            updateData,
            {
                new:true,
                runValidators:true
            }
        );

        if(!menuItem){
            throw new Error("Menu item not found");
        }

        return menuItem;
    }
    const deleteMenuItem=async(menuItemId)=>{
        const menuItem=await MenuItem.findByIdAndDelete(menuItemId);

        if(!menuItem){
            throw new Error("menu item not found");
        }
        return menuItem;
    }

    module.exports={
        createMenuItem,
        getRestaurantMenu,
        getMenuItemById,
        updateMenuItem,
        deleteMenuItem
    }