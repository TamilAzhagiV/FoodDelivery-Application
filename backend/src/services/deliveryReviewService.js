const DeliveryReview = require("../models/DeliveryReview");
const DeliveryPartner = require("../models/DeliveryPartner");
const Order = require("../models/Order");

/* Create Delivery Review */

const createDeliveryReview = async (
    customerId,
    reviewData
) => {

    const {
        orderId,
        ratings,
        review
    } = reviewData;

    // Check Order

    const order = await Order.findOne({
        _id: orderId,
        customerId
    });

    if (!order) {
        throw new Error("Order not found");
    }

    // Order Delivered?

    if (order.orderStatus !== "DELIVERED") {
        throw new Error(
            "You can review only delivered orders"
        );
    }

    // Delivery Partner Exists?

    if (!order.deliveryPartnerId) {
        throw new Error(
            "Delivery partner not assigned"
        );
    }

    // Already Reviewed?

    const existingReview =
        await DeliveryReview.findOne({
            orderId
        });

    if (existingReview) {
        throw new Error(
            "Delivery already reviewed"
        );
    }

    // Create Review

    const deliveryReview =
        await DeliveryReview.create({

            customerId,

            orderId,

            deliveryPartnerId:
                order.deliveryPartnerId,

            ratings,

            review

        });

    // Update Delivery Partner Rating

    const deliveryPartner =
        await DeliveryPartner.findById(
            order.deliveryPartnerId
        );

    const totalRatings =
        deliveryPartner.totalRatings + 1;

    const averageRating =
        (
            (
                deliveryPartner.rating *
                deliveryPartner.totalRatings
            )
            +
            ratings.overallExperience
        ) / totalRatings;

    deliveryPartner.rating =
        Number(
            averageRating.toFixed(1)
        );

    deliveryPartner.totalRatings =
        totalRatings;

    await deliveryPartner.save();

    return deliveryReview;

};

/* Get Reviews */

const getDeliveryReviews = async (
    deliveryPartnerUserId
) => {

    const deliveryPartner =
        await DeliveryPartner.findOne({
            userId: deliveryPartnerUserId
        });

    if (!deliveryPartner) {
        throw new Error(
            "Delivery partner not found"
        );
    }

    return await DeliveryReview.find({

        deliveryPartnerId:
            deliveryPartner._id

    })
    .populate(
        "customerId",
        "fullName"
    )
    .sort({
        createdAt: -1
    });

};

/* Get Review By Id */

const getDeliveryReviewById = async (
    reviewId
) => {

    const review =
        await DeliveryReview.findById(
            reviewId
        )
        .populate(
            "customerId",
            "fullName"
        );

    if (!review) {
        throw new Error(
            "Review not found"
        );
    }

    return review;

};

/* Update Review */

const updateDeliveryReview = async (
    customerId,
    reviewId,
    reviewData
) => {

    const review =
        await DeliveryReview.findOne({

            _id: reviewId,
            customerId

        });

    if (!review) {
        throw new Error(
            "Review not found"
        );
    }

    review.ratings = reviewData.ratings;
    review.review = reviewData.review;

    await review.save();

    // Recalculate Rating

    const reviews =
        await DeliveryReview.find({

            deliveryPartnerId:
                review.deliveryPartnerId

        });

    const totalRatings =
        reviews.length;

    const averageRating =
        reviews.reduce(
            (sum, review) =>
                sum +
                review.ratings.overallExperience,
            0
        ) / totalRatings;

    await DeliveryPartner.findByIdAndUpdate(

        review.deliveryPartnerId,

        {
            rating: Number(
                averageRating.toFixed(1)
            ),
            totalRatings
        }

    );

    return review;

};

/* Delete Review */

const deleteDeliveryReview = async (
    customerId,
    reviewId
) => {

    const review =
        await DeliveryReview.findOne({

            _id: reviewId,
            customerId

        });

    if (!review) {
        throw new Error(
            "Review not found"
        );
    }

    const deliveryPartnerId =
        review.deliveryPartnerId;

    await review.deleteOne();

    const reviews =
        await DeliveryReview.find({

            deliveryPartnerId

        });

    const totalRatings =
        reviews.length;

    let averageRating = 0;

    if (totalRatings > 0) {

        averageRating =
            reviews.reduce(
                (sum, review) =>
                    sum +
                    review.ratings.overallExperience,
                0
            ) / totalRatings;

    }

    await DeliveryPartner.findByIdAndUpdate(

        deliveryPartnerId,

        {
            rating: Number(
                averageRating.toFixed(1)
            ),
            totalRatings
        }

    );

};

module.exports = {
    createDeliveryReview,
    getDeliveryReviews,
    getDeliveryReviewById,
    updateDeliveryReview,
    deleteDeliveryReview
};