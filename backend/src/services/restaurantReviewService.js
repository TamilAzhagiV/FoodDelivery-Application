const RestaurantReview = require("../models/RestaurantReview");
const Restaurant = require("../models/Restaurant");
const Order = require("../models/Order");

/* Create Review */
const createRestaurantReview = async (customerId, reviewData) => {

    const { orderId, rating, review } = reviewData;

    const order = await Order.findOne({
        _id: orderId,
        customerId
    });

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.orderStatus !== "DELIVERED") {
        throw new Error("You can review only delivered orders");
    }

    const existingReview = await RestaurantReview.findOne({ orderId });

    if (existingReview) {
        throw new Error("Restaurant already reviewed");
    }

    const restaurantReview = await RestaurantReview.create({
        customerId,
        orderId,
        restaurantId: order.restaurantId,
        rating,
        review
    });

    const restaurant = await Restaurant.findById(order.restaurantId);

    const totalRatings = restaurant.totalRatings + 1;

    restaurant.rating =
        Number(
            (
                ((restaurant.rating * restaurant.totalRatings) + rating)
                / totalRatings
            ).toFixed(1)
        );

    restaurant.totalRatings = totalRatings;

    await restaurant.save();

    return restaurantReview;
};

/* Get Restaurant Reviews */

const getRestaurantReviews = async (ownerId) => {

    const restaurant = await Restaurant.findOne({
        ownerId
    });

    if (!restaurant) {
        throw new Error("Restaurant not found");
    }

    return await RestaurantReview.find({
        restaurantId: restaurant._id
    })
    .populate(
        "customerId",
        "fullName profileImage"
    )
    .sort({
        createdAt: -1
    });

};

/* Get Review By Id */

const getRestaurantReviewById = async (reviewId) => {

    const review = await RestaurantReview.findById(reviewId)
        .populate(
            "customerId",
            "fullName profileImage"
        );

    if (!review) {
        throw new Error("Review not found");
    }

    return review;

};

/* Update Review */

const updateRestaurantReview = async (
    customerId,
    reviewId,
    reviewData
) => {

    const review = await RestaurantReview.findOne({
        _id: reviewId,
        customerId
    });

    if (!review) {
        throw new Error("Review not found");
    }

    review.rating = reviewData.rating;
    review.review = reviewData.review;

    await review.save();

    // Recalculate Rating

    const restaurantReviews =
        await RestaurantReview.find({
            restaurantId: review.restaurantId
        });

    const totalRatings = restaurantReviews.length;

    const averageRating =
        restaurantReviews.reduce(
            (sum, review) => sum + review.rating,
            0
        ) / totalRatings;

    await Restaurant.findByIdAndUpdate(
        review.restaurantId,
        {
            rating: Number(averageRating.toFixed(1)),
            totalRatings
        }
    );

    return review;

};

/* Delete Review */

const deleteRestaurantReview = async (
    customerId,
    reviewId
) => {

    const review = await RestaurantReview.findOne({
        _id: reviewId,
        customerId
    });

    if (!review) {
        throw new Error("Review not found");
    }

    const restaurantId = review.restaurantId;

    await review.deleteOne();

    const reviews = await RestaurantReview.find({
        restaurantId
    });

    const totalRatings = reviews.length;

    let averageRating = 0;

    if (totalRatings > 0) {

        averageRating =
            reviews.reduce(
                (sum, review) => sum + review.rating,
                0
            ) / totalRatings;

    }

    await Restaurant.findByIdAndUpdate(
        restaurantId,
        {
            rating: Number(averageRating.toFixed(1)),
            totalRatings
        }
    );

    return;

};

module.exports = {
    createRestaurantReview,
    getRestaurantReviews,
    getRestaurantReviewById,
    updateRestaurantReview,
    deleteRestaurantReview
};