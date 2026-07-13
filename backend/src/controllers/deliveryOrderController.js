const deliveryOrderService = require("../services/deliveryOrderService");

const getAvailableOrders = async (req, res) => {

    try {

        const orders = await deliveryOrderService.getAvailableOrders();

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

const acceptDeliveryOrder = async (req, res) => {

    try {

        const io = req.app.get("io");

        const order = await deliveryOrderService.acceptDeliveryOrder(
            req.user.userId,
            req.params.orderId,
            io
        );

        res.status(200).json({
            success: true,
            message: "Delivery order accepted successfully",
            data: order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const pickupOrder = async (req, res) => {

    try {

        const io = req.app.get("io");

        const order = await deliveryOrderService.pickupOrder(
            req.user.userId,
            req.params.orderId,
            io
        );

        res.status(200).json({
            success: true,
            message: "Order picked up successfully",
            data: order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const deliverOrder = async (req, res) => {

    try {

        const io = req.app.get("io");

        const order = await deliveryOrderService.deliverOrder(
            req.user.userId,
            req.params.orderId,
            io
        );

        res.status(200).json({
            success: true,
            message: "Order delivered successfully",
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
    getAvailableOrders,
    acceptDeliveryOrder,
    pickupOrder,
    deliverOrder
};
