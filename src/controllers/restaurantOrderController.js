const restaurantOrderService =require("../services/restaurantOrderService");

const getRestaurantOrders =async (req, res) => {
    try {

        const orders =await restaurantOrderService.getRestaurantOrders(
                req.user.userId
            );

        res.status(200).json({
            success: true,
            data: orders
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const acceptOrder = async (req,res) => {
    try {
        const io = req.app.get("io");
        const order =await restaurantOrderService.acceptOrder(
                req.user.userId,
                req.params.orderId,
                io
            );

        res.status(200).json({
            success: true,
            message:"Order accepted successfully",
            data: order
        });

    }
     catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const startPreparingOrder =async (req, res) => {
    try {
        const io = req.app.get("io");
        const order =await restaurantOrderService.startPreparingOrder(
                req.user.userId,
                req.params.orderId,
                io
            );

        res.status(200).json({
            success: true,
            message:"Order preparation started",
            data: order
        });

    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const markOrderReady = async (req,res) => {
    try {
        const io = req.app.get("io");
        const order =await restaurantOrderService.markOrderReady(
                req.user.userId,
                req.params.orderId,
                io
            );

        res.status(200).json({
            success: true,
            message:"Order is ready for pickup",
            data: order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




module.exports = {
    getRestaurantOrders,
    acceptOrder,
    startPreparingOrder,
    markOrderReady,

};