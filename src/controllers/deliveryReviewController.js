const deliveryReviewService = require("../services/deliveryReviewService");

/* Create Delivery Review */

const createDeliveryReview = async (req, res) => {

    try {

        const review =
            await deliveryReviewService.createDeliveryReview(
                req.user.userId,
                req.body
            );

        res.status(201).json({
            success: true,
            message: "Delivery review submitted successfully",
            data: review
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/* Get Delivery Reviews */

const getDeliveryReviews = async (req, res) => {

    try {

        const reviews =
            await deliveryReviewService.getDeliveryReviews(
                req.user.userId
            );

        res.status(200).json({
            success: true,
            data: reviews
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/* Get Delivery Review By Id */

const getDeliveryReviewById = async (req, res) => {

    try {

        const review =
            await deliveryReviewService.getDeliveryReviewById(
                req.params.reviewId
            );

        res.status(200).json({
            success: true,
            data: review
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/* Update Delivery Review */

const updateDeliveryReview = async (req, res) => {

    try {

        const review =
            await deliveryReviewService.updateDeliveryReview(
                req.user.userId,
                req.params.reviewId,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Delivery review updated successfully",
            data: review
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/* Delete Delivery Review */

const deleteDeliveryReview = async (req, res) => {

    try {

        await deliveryReviewService.deleteDeliveryReview(
            req.user.userId,
            req.params.reviewId
        );

        res.status(200).json({
            success: true,
            message: "Delivery review deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createDeliveryReview,
    getDeliveryReviews,
    getDeliveryReviewById,
    updateDeliveryReview,
    deleteDeliveryReview
};