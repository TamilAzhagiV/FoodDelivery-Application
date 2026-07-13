const paymentService = require("../services/paymentService");

const createPayment = async (req, res) => {
    try {

        const result = await paymentService.createPayment(
            req.user.userId
        );

        res.status(200).json({
            success: true,
            message: result.message,
            data: result.data
        });

    } catch (error) {
         console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const verifyPayment = async (req, res) => {
    try {

        const result = await paymentService.verifyPayment(
            req.user.userId,
            req.body.paymentId,
            req.body.razorpayOrderId,
            req.body.razorpayPaymentId,
            req.body.razorpaySignature
        );

        res.status(200).json({
            success: true,
            message: result.message,
            data: result.data
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const paymentWebhook = async (req, res) => {
    try {

        const result = await paymentService.paymentWebhook(
            req.headers["x-razorpay-signature"],
            req.body
        );

        res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

const getDeliveryHistory = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const history =await deliveryPartnerService.getDeliveryHistory(
                req.user.userId,
                page,
                limit
            );

        res.status(200).json({
            success: true,
            message: "Delivery history fetched successfully",
            data: history
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createPayment,
    verifyPayment,
    paymentWebhook,
    getDeliveryHistory
};