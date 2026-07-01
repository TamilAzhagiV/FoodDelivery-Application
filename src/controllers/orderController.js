const orderService =require("../services/orderService");

const placeOrder = async (req,res) => {
    try {
        const order =await orderService.placeOrder(req.user.userId);

        res.status(201).json({
            success: true,
            message:"Order placed successfully",
            data: order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getOrders = async (req,res) => {
    try {
        const orders =await orderService.getOrders(req.user.userId);
        res.status(200).json({
            success: true,
            data: orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getOrderById = async (req,res) => {
    try {
        const order =await orderService.getOrderById(
                req.user.userId,
                req.params.orderId
            );
        res.status(200).json({
            success: true,
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

const cancelOrder = async (req,res) => {
    try {
        const order =await orderService.cancelOrder(req.user.userId,req.params.orderId);
        res.status(200).json({
            success: true,
            message:"Order cancelled successfully",
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

module.exports = {
    placeOrder,
    getOrders,
    getOrderById,
    cancelOrder
};