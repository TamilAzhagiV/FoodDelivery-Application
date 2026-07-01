const restaurantReviewService = require("../services/restaurantReviewService");

const createRestaurantReview = async (req, res) => {

    try {

        const review =
            await restaurantReviewService.createRestaurantReview(
                req.user.userId,
                req.body
            );

        res.status(201).json({
            success: true,
            message: "Restaurant review submitted successfully",
            data: review
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getRestaurantReviews = async (req, res) => {

    try {

        const reviews =
            await restaurantReviewService.getRestaurantReviews(
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

const getRestaurantReviewById = async (req, res) => {

    try {

        const review =
            await restaurantReviewService.getRestaurantReviewById(
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

const updateRestaurantReview = async (req, res) => {

    try {

        const review =
            await restaurantReviewService.updateRestaurantReview(
                req.user.userId,
                req.params.reviewId,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Restaurant review updated successfully",
            data: review
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const deleteRestaurantReview = async (req, res) => {

    try {

        await restaurantReviewService.deleteRestaurantReview(
            req.user.userId,
            req.params.reviewId
        );

        res.status(200).json({
            success: true,
            message: "Restaurant review deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createRestaurantReview,
    getRestaurantReviews,
    getRestaurantReviewById,
    updateRestaurantReview,
    deleteRestaurantReview
};