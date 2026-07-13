const deliveryPartnerService = require("../services/deliveryPartnerService");

const updateAvailabilityStatus = async (req, res) => {

    try {

        const deliveryPartner =
            await deliveryPartnerService.updateAvailabilityStatus(
                req.user.userId,
                req.body.availabilityStatus
            );

        res.status(200).json({
            success: true,
            message: "Availability status updated successfully",
            data: deliveryPartner
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getCurrentOrder = async (req, res) => {

    try {

        const order = await deliveryPartnerService.getCurrentOrder(
            req.user.userId
        );

        res.status(200).json({
            success: true,
            message: "Current order fetched successfully",
            data: order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getDeliveryHistory = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const history =
            await deliveryPartnerService.getDeliveryHistory(
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
const getDeliveryHistoryById = async (req, res) => {

    try {

        const order =
            await deliveryPartnerService.getDeliveryHistoryById(
                req.user.userId,
                req.params.orderId
            );

        res.status(200).json({
            success: true,
            message: "Delivery history fetched successfully",
            data: order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const updateCurrentLocation = async (req, res) => {

    try {

        const deliveryPartner =
            await deliveryPartnerService.updateCurrentLocation(
                req.user.userId,
                req.body.latitude,
                req.body.longitude
            );

        res.status(200).json({
            success: true,
            message: "Current location updated successfully",
            data: deliveryPartner
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getEarnings = async (req, res) => {

    try {

        const period = req.query.period || "today";

        const earnings = await deliveryPartnerService.getEarnings(
            req.user.userId,
            period
        );

        res.status(200).json({
            success: true,
            message: "Earnings fetched successfully",
            data: earnings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const getStatistics = async (req, res) => {

    try {

        const statistics =await deliveryPartnerService.getStatistics(req.user.userId);
        res.status(200).json({
            success: true,
            message: "Statistics fetched successfully",
            data: statistics
        });

    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getDashboard = async (req, res) => {

    try {

        const dashboard =await deliveryPartnerService.getDashboard(req.user.userId);
        res.status(200).json({
            success: true,
            message: "Dashboard fetched successfully",
            data: dashboard
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
    updateAvailabilityStatus,
    getCurrentOrder,
    getDeliveryHistory,
    getDeliveryHistoryById,
    updateCurrentLocation,
    getEarnings,
    getStatistics,
    getDashboard
};