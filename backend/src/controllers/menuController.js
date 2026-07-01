const menuService=require("../services/menuService");

const createMenuItem=async(req,res)=>{
    try{
        
        if (req.files?.image?.length > 0) {
            req.body.image = req.files.image[0].path;
        }

        const menuItem=await menuService.createMenuItem(
            req.user.userId,
            req.body
        );
        res.status(201).json({
            success:true,
            data:menuItem
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getRestaurantMenu=async(req,res)=>{
    try{
        const menuItems=await menuService.getRestaurantMenu(
            req.user.userId
        );
        res.status(200).json({
            success:true,
            data:menuItems
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getMenuItemById=async(req,res)=>{
    try{
        const menuItem=await menuService.getMenuItemById(
            req.params.menuItemId
        );
        res.status(200).json({
            success:true,
            data:menuItem
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
const updateMenuItem=async(req,res)=>{
    try{
        if (req.files?.image?.length > 0) {
            req.body.image = req.files.image[0].path;
        }
        const menuItem=await menuService.updateMenuItem(
            req.params.menuItemId,
            req.body,
        );
        res.status(200).json({
            success: true,
            message:"Menu item updated successfully",
            data: menuItem
        });
        
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const deleteMenuItem=async(req,res)=>{
    try{
        await menuService.deleteMenuItem(req.params.menuItemId);
        res.status(200).json({
            success:true,
            message:"Menu item is deleted successfully"
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
    createMenuItem,
    getRestaurantMenu,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem
}