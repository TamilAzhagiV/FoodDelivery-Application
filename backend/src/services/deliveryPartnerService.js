const DeliveryPartner = require("../models/DeliveryPartner");
const Order = require("../models/Order");

const validateDeliveryPartner = async (userId) => {

    const deliveryPartner = await DeliveryPartner.findOne({
        userId
    });

    if (!deliveryPartner) {
        throw new Error("Delivery partner not found");
    }

    if (!deliveryPartner.isActive) {
        throw new Error("Delivery partner account is inactive");
    }

    if (deliveryPartner.isBlocked) {
        throw new Error("Delivery partner account is blocked");
    }

    if (!deliveryPartner.isVerified) {
        throw new Error("Delivery partner account is not verified");
    }

    if (deliveryPartner.approvalStatus !== "APPROVED") {
        throw new Error("Delivery partner account is not approved");
    }

    return deliveryPartner;
};

const updateAvailabilityStatus = async (userId,availabilityStatus) => {

    const deliveryPartner = await validateDeliveryPartner(userId);

    deliveryPartner.availabilityStatus = availabilityStatus;
    deliveryPartner.lastActiveAt = new Date();

    await deliveryPartner.save();

    return deliveryPartner;
};

const getCurrentOrder = async (userId) => {

    const deliveryPartner = await validateDeliveryPartner(userId);

    const order = await Order.findOne({
        deliveryPartnerId: deliveryPartner._id,
        orderStatus: "OUT_FOR_DELIVERY"
    })
        .populate(
            "customerId",
            "fullName phoneNumber"
        )
        .populate(
            "restaurantId",
            "restaurantName address"
        )
        .populate(
            "items.menuItemId",
            "name image price"
        );

    if (!order) {
        throw new Error("No active delivery found");
    }

    return order;
};

const getDeliveryHistory = async (userId,page = 1,limit = 10) => {

    const deliveryPartner = await validateDeliveryPartner(
        userId
    );

    const skip = (page - 1) * limit;

    const deliveries = await Order.find({deliveryPartnerId: deliveryPartner._id,orderStatus: "DELIVERED"})
        .populate(
            "customerId",
            "fullName phoneNumber"
        )
        .populate(
            "restaurantId",
            "restaurantName address"
        )
        .populate(
            "items.menuItemId",
            "name image"
        )
        .sort({
            deliveredAt: -1
        })
        .skip(skip)
        .limit(limit);

    const totalDeliveries = await Order.countDocuments({
        deliveryPartnerId: deliveryPartner._id,
        orderStatus: "DELIVERED"
    });

    return {
        deliveries,
        pagination: {
            total: totalDeliveries,
            page,
            limit,
            totalPages: Math.ceil(totalDeliveries / limit)
        }
    };
};
const getDeliveryHistoryById = async (userId,orderId) => {

    const deliveryPartner =await validateDeliveryPartner(userId);

    const order = await Order.findOne({
        _id: orderId,
        deliveryPartnerId: deliveryPartner._id,
        orderStatus: "DELIVERED"
    })
    .populate(
        "customerId",
        "fullName phoneNumber"
    )
    .populate(
        "restaurantId",
        "restaurantName address"
    )
    .populate(
        "items.menuItemId",
        "name image price"
    );

    if (!order) {
        throw new Error("Delivery history not found");
    }

    return order;
};
const updateCurrentLocation = async (userId,latitude,longitude) => {

    const deliveryPartner = await validateDeliveryPartner(userId);

    deliveryPartner.currentLocation = {
        type: "Point",
        coordinates: [
            longitude,
            latitude
        ]
    };

    deliveryPartner.lastActiveAt = new Date();

    await deliveryPartner.save();

    return deliveryPartner;
};

const getEarnings = async (userId, period = "today") => {

    const deliveryPartner = await validateDeliveryPartner(userId);

    let earnings = 0;

    switch (period) {

        case "today":
            earnings = deliveryPartner.earningsToday;
            break;

        case "month":
            earnings = deliveryPartner.earningsThisMonth;
            break;

        case "lifetime":
            earnings = deliveryPartner.totalEarnings;
            break;

        case "week": {

            const today = new Date();
            const firstDayOfWeek = new Date(today);

            firstDayOfWeek.setDate(
                today.getDate() - today.getDay()
            );

            const orders = await Order.find({
                deliveryPartnerId: deliveryPartner._id,
                orderStatus: "DELIVERED",
                deliveredAt: {
                    $gte: firstDayOfWeek
                }
            });

            earnings = orders.reduce(
                (total, order) => total + (order.deliveryPartnerEarnings  || 0),
                0
            );

            break;
        }

        default:
            throw new Error("Invalid earnings period");
    }

    return {
        period,
        earnings
    };
};

const getNearestDeliveryPartners = async (longitude,latitude,maxDistance = 5000) => {

    const deliveryPartners = await DeliveryPartner.find({
        availabilityStatus: "ONLINE",
        approvalStatus: "APPROVED",
        isVerified: true,
        isActive: true,
        isBlocked: false,
        currentLocation: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [longitude,latitude]
                },
                $maxDistance: maxDistance
            }
        }
    }).populate(
        "userId",
        "fullName phoneNumber"
    );

    return deliveryPartners;
};

const getStatistics = async (userId) => {

    const deliveryPartner = await validateDeliveryPartner(userId);
    const acceptanceRate =deliveryPartner.totalOrdersOffered === 0? 0: Number(
                ((deliveryPartner.acceptedOrders /deliveryPartner.totalOrdersOffered) * 100).toFixed(2));

    const completionRate =
        deliveryPartner.acceptedOrders === 0? 0: Number(
                ((deliveryPartner.completedDeliveries /deliveryPartner.acceptedOrders) * 100).toFixed(2)
            );

    return {
        totalOrdersOffered:deliveryPartner.totalOrdersOffered,
        acceptedOrders:deliveryPartner.acceptedOrders,
        completedDeliveries:deliveryPartner.completedDeliveries,
        cancelledDeliveries:deliveryPartner.cancelledDeliveries,
        totalDeliveries:deliveryPartner.totalDeliveries,
        rating:deliveryPartner.rating,
        totalRatings:deliveryPartner.totalRatings,
        acceptanceRate,
        completionRate
    };

};

const getDashboard = async (userId) => {

    const deliveryPartner =await validateDeliveryPartner(userId);

    const currentOrder = await Order.findOne({
        deliveryPartnerId: deliveryPartner._id,
        orderStatus: "OUT_FOR_DELIVERY"
    })
    .populate(
        "customerId",
        "fullName phoneNumber"
    )
    .populate(
        "restaurantId",
        "restaurantName address"
    );

    const today = new Date();

    const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    const todayDeliveries =await Order.countDocuments({
            deliveryPartnerId: deliveryPartner._id,
            orderStatus: "DELIVERED",
            deliveredAt: {
                $gte: startOfDay
            }
        });

    return {
        availabilityStatus:deliveryPartner.availabilityStatus,
        currentOrder,
        todayEarnings:deliveryPartner.earningsToday,
        todayDeliveries,
        rating:deliveryPartner.rating,
        completedDeliveries:deliveryPartner.completedDeliveries
    };

};

module.exports = {
    updateAvailabilityStatus,
    getCurrentOrder,
    getDeliveryHistory,
    getDeliveryHistoryById,
    updateCurrentLocation,
    getEarnings,
    getNearestDeliveryPartners,
    validateDeliveryPartner,
    getStatistics,
    getDashboard    
};
