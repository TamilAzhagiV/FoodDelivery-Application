const restaurantService=require("../services/restaurantService");

const getAllRestaurants=async(req,res)=>{
    try{
        const restaurants =await restaurantService.getAllRestaurants();

        res.status(200).json({
            success: true,
            data: restaurants
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
const getRestaurantById = async (req,res) => {
    try {
        const restaurant =await restaurantService.getRestaurantById(req.params.restaurantId);

        res.status(200).json({
            success: true,
            data: restaurant
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

const getRestaurantMenu = async (req,res) => {
    try {
        const menuItems =await restaurantService.getRestaurantMenu(req.params.restaurantId);

        res.status(200).json({
            success: true,
            data: menuItems
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

const searchMenuItems = async (req, res) => {
    try {

        const { keyword } = req.query;
        const menuItems =await restaurantService.searchMenuItems(keyword);

        res.status(200).json({
            success: true,
            data: menuItems
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports={
    getAllRestaurants,
    getRestaurantById,
    getRestaurantMenu,
    searchMenuItems
}