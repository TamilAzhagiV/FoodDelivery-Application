const Restaurant=require('../models/Restaurant');
const DeliveryPartner=require('../models/DeliveryPartner');
const User = require("../models/User");
const Order = require("../models/Order");
const Payment = require("../models/Payment");

const getAllDeliveryPartners=async()=>{
    const partners=await DeliveryPartner.find().
    populate(
        "userId",
        "fullName email phoneNumber"
    );

    return partners;
}
const getPendingDeliveryPartners=async()=>{
    const partners=await DeliveryPartner.find({
        approvalStatus:"PENDING"
    }).populate(
        "userId",
        "fullName email phoneNumber"
    ).sort({createdAt:-1});
    console.log(partners)
    return partners;
}

const approveDeliveryPartner=async(partnerId,adminId)=>{
    const partner=await DeliveryPartner.findById(partnerId);
    if(!partner){
        throw new Error("Delivery-Partner not found");
    }
    partner.approvalStatus="APPROVED";
    partner.approvedBy=adminId;
    partner.approvedAt=new Date();
    partner.isVerified=true;

    await partner.save();
    
    return partner;
}

const rejectDeliveryPartner=async(partnerId,adminId,rejectionReason)=>{
    const partner =await DeliveryPartner.findById(partnerId);
    if(!partner){
        throw new Error("Delivery-Partner not found")
    }
    partner.approvalStatus="REJECTED";
    partner.rejectedBy=adminId;
    partner.rejectedAt=new Date();
    partner.rejectionReason=rejectionReason;
    await partner.save();
    return partner;
}

const getPendingRestaurants=async()=>{
    const restaurants=await Restaurant.find({
        profileStatus:"COMPLETED",
        approvalStatus:"PENDING"
    }).populate(
        "ownerId",
        "fullName email phoneNumber"
    );
    return restaurants;
}

const getAllRestaurants=async()=>{
    const restaurants=await Restaurant.find().
    populate(
        "ownerId",
        "fullName email phoneNumber"

    )
    .sort({createdAt:-1});
    return restaurants
}

const approveRestaurant = async (restaurantId,adminId) => {

    const restaurant =await Restaurant.findById(restaurantId);

    if (!restaurant) {
        throw new Error("Restaurant not found");
    }
    restaurant.approvalStatus ="APPROVED";
    restaurant.approvedBy =adminId;
    restaurant.approvedAt =new Date();

    await restaurant.save();
    return restaurant;
};

const rejectRestaurant= async (restaurantId,adminId,rejectionReason) => {

    const restaurant =await Restaurant.findById(restaurantId);

    if (!restaurant) {
        throw new Error("Restaurant not found");
    }

    restaurant.approvalStatus ="REJECTED";
    restaurant.rejectedBy =adminId;
    restaurant.rejectedAt =new Date();
    restaurant.rejectionReason =rejectionReason;
    await restaurant.save();
    return restaurant;
};

const getDashboard = async () => {

    const today = new Date();

    const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    const [
        totalUsers,
        totalRestaurants,
        totalDeliveryPartners,
        pendingRestaurantApprovals,
        pendingDeliveryPartnerApprovals,
        todayOrders,
        revenue
    ] = await Promise.all([

        User.countDocuments(),
        Restaurant.countDocuments(),
        DeliveryPartner.countDocuments(),

        Restaurant.countDocuments({
            approvalStatus: "PENDING"
        }),

        DeliveryPartner.countDocuments({
            approvalStatus: "PENDING"
        }),

        Order.countDocuments({
            createdAt: {$gte: startOfDay}
        }),

        Payment.aggregate([
            {
                $match: { paymentStatus: "SUCCESS"}
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$amount"
                    }
                }
            }
        ])
    ]);

    return {

        totalUsers,
        totalRestaurants,
        totalDeliveryPartners,
        pendingRestaurantApprovals,
        pendingDeliveryPartnerApprovals,
        todayOrders,
        totalRevenue:revenue.length > 0? revenue[0].totalRevenue: 0
    };

};

const getAllUsers = async () => {

    const users = await User.find()
        .select("-password -refreshToken")
        .sort({
            createdAt: -1
        });

    return users;

};

const getUserById = async (userId) => {
    const user = await User.findById(userId)
        .select("-password -refreshToken");

    if (!user) {
        throw new Error("User not found");
    }

    return user;

};

const blockUser = async (userId,adminId, blockedReason) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.role === "ADMIN") {
        throw new Error("Admin account cannot be blocked");
    }

    if (user.status === "BLOCKED") {
        throw new Error("User is already blocked");
    }

    user.status = "BLOCKED";
    user.blockedReason = blockedReason;
    user.blockedBy = adminId;
    user.blockedAt = new Date();

    await user.save();
    return user;

};

const unblockUser = async (userId) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.role === "ADMIN") {
        throw new Error("Admin account cannot be unblocked");
    }

    if (user.status !== "BLOCKED") {
        throw new Error("User is not blocked");
    }

    user.status = "ACTIVE";
    user.blockedReason = null;
    user.blockedBy = null;
    user.blockedAt = null;

    await user.save();
    return user;

};

const getRestaurantById = async (restaurantId) => {

    const restaurant = await Restaurant.findById(restaurantId)
    .populate(
        "ownerId",
        "fullName email phoneNumber"
    );

    if (!restaurant) {
        throw new Error("Restaurant not found");
    }

    return restaurant;

};

const getDeliveryPartnerById = async (partnerId) => {

    const partner = await DeliveryPartner.findById(partnerId)
        .populate(
            "userId",
            "fullName email phoneNumber status isVerified createdAt"
        );

    if (!partner) {
        throw new Error("Delivery partner not found");
    }

    return partner;

};

const blockDeliveryPartner = async (partnerId,blockedReason) => {

    const partner = await DeliveryPartner.findById(partnerId);

    if (!partner) {
        throw new Error("Delivery partner not found");
    }

    if (partner.isBlocked) {
        throw new Error("Delivery partner is already blocked");
    }

    partner.isBlocked = true;
    partner.blockedReason = blockedReason;

    await partner.save();

    await User.findByIdAndUpdate(
        partner.userId,
        {
            status: "BLOCKED"
        }
    );

    return await DeliveryPartner.findById(partnerId)
        .populate(
            "userId",
            "fullName email phoneNumber status"
        );

};

const unblockDeliveryPartner = async (partnerId) => {

    const partner = await DeliveryPartner.findById(partnerId);

    if (!partner) {
        throw new Error("Delivery partner not found");
    }

    if (!partner.isBlocked) {
        throw new Error("Delivery partner is not blocked");
    }

    partner.isBlocked = false;
    partner.blockedReason = null;
    partner.blockedBy = null;
    partner.blockedAt = null;

    await partner.save();

    await User.findByIdAndUpdate(
        partner.userId,
        {
            status: "ACTIVE"
        }
    );

    return await DeliveryPartner.findById(partnerId)
        .populate(
            "userId",
            "fullName email phoneNumber status"
        );

};

const getAllOrders = async (page = 1,limit = 10) => {

    const skip = (page - 1) * limit;

    const orders = await Order.find()
        .populate(
            "customerId",
            "fullName phoneNumber"
        )
        .populate(
            "restaurantId",
            "restaurantName"
        )
        .populate(
            "deliveryPartnerId",
            "userId"
        )
        .sort({
            createdAt: -1
        })
        .skip(skip)
        .limit(limit);

    const totalOrders =
        await Order.countDocuments();

    return {
        orders,
        pagination: {
            total: totalOrders,
            page,
            limit,
            totalPages: Math.ceil(
                totalOrders / limit
            )
        }
    };

};

const getOrderById = async (orderId) => {

    const order = await Order.findById(orderId)
        .populate(
            "customerId",
            "fullName email phoneNumber"
        )
        .populate(
            "restaurantId",
            "restaurantName businessPhoneNumber address"
        )
        .populate(
            "deliveryPartnerId",
            "userId rating totalDeliveries"
        )
        .populate(
            "items.menuItemId",
            "name image price category"
        );

    if (!order) {
        throw new Error("Order not found");
    }

    return order;

};

const getOrdersByStatus = async (status,page = 1,limit = 10) => {

    const skip = (page - 1) * limit;

    const orders = await Order.find({
        orderStatus: status
    })
    .populate(
        "customerId",
        "fullName phoneNumber"
    )
    .populate(
        "restaurantId",
        "restaurantName"
    )
    .populate(
        "deliveryPartnerId",
        "userId"
    )
    .sort({
        createdAt: -1
    })
    .skip(skip)
    .limit(limit);

    const totalOrders =
        await Order.countDocuments({
            orderStatus: status
        });

    return {
        orders,
        pagination: {
            total: totalOrders,
            page,
            limit,
            totalPages: Math.ceil(
                totalOrders / limit
            )
        }
    };

};

const cancelOrder = async (orderId,adminId,reason) => {
    const order = await Order.findById(orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    if (
        order.orderStatus === "DELIVERED" ||
        order.orderStatus === "CANCELLED"
    ) {
        throw new Error(
            "Order cannot be cancelled"
        );
    }

    order.orderStatus = "CANCELLED";
    order.cancelledBy = adminId;
    order.cancelledAt = new Date();
    order.cancellationReason = reason;

    await order.save();

    return order;

};

const updateOrderStatus = async (orderId,orderStatus) => {
    const order = await Order.findById(orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    order.orderStatus = orderStatus;

    if (orderStatus === "DELIVERED") {
        order.deliveredAt = new Date();
        if (order.paymentMethod === "COD") {
            order.paymentStatus = "SUCCESS";
        }
    }

    if (orderStatus === "OUT_FOR_DELIVERY" && !order.pickedUpAt) {
        order.pickedUpAt = new Date();
    }

    await order.save();

    return order;

};


const getAllPayments = async (page = 1,limit = 10) => {

    const skip = (page - 1) * limit;

    const payments = await Payment.find()
        .populate(
            "customerId",
            "fullName email phoneNumber"
        )
        .populate(
            "orderId",
            "orderStatus totalAmount"
        )
        .sort({
            createdAt: -1
        })
        .skip(skip)
        .limit(limit);

    const totalPayments = await Payment.countDocuments();

    return {
        payments,
        pagination: {
            total: totalPayments,
            page,
            limit,
            totalPages: Math.ceil(totalPayments / limit)
        }
    };

};

const getPaymentById = async (paymentId) => {

    const payment = await Payment.findById(paymentId)
        .populate(
            "customerId",
            "fullName email phoneNumber"
        )
        .populate(
            "orderId",
            "orderStatus totalAmount paymentMethod paymentStatus"
        );

    if (!payment) {
        throw new Error("Payment not found");
    }

    return payment;

};

const getPaymentsByStatus = async (status,page = 1,limit = 10) => {
    const skip = (page - 1) * limit;

    const payments = await Payment.find({paymentStatus: status})
    .populate(
        "customerId",
        "fullName email phoneNumber"
    )
    .populate(
        "orderId",
        "orderStatus totalAmount"
    )
    .sort({
        createdAt: -1
    })
    .skip(skip)
    .limit(limit);

    const totalPayments =
        await Payment.countDocuments({
            paymentStatus: status
        });

    return {
        payments,
        pagination: {
            total: totalPayments,
            page,
            limit,
            totalPages: Math.ceil(
                totalPayments / limit
            )
        }
    };

};

const getPaymentStatistics = async () => {

    const totalPayments =await Payment.countDocuments();
    const successfulPayments =await Payment.countDocuments({
            paymentStatus: "SUCCESS"
        });

    const pendingPayments =await Payment.countDocuments({
            paymentStatus: "PENDING"
        });

    const failedPayments =await Payment.countDocuments({
            paymentStatus: "FAILED"
        });

    const refundedPayments =await Payment.countDocuments({
            paymentStatus: "REFUNDED"
        });

    const revenue =
        await Payment.aggregate([{
                $match: {paymentStatus: "SUCCESS"}
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {$sum: "$amount" }
                }
            }
        ]);

    const refund =
        await Payment.aggregate([
            {
                $match: {
                    paymentStatus: "REFUNDED"
                }
            },
            {
                $group: {
                    _id: null,
                    totalRefund: {
                        $sum: "$refundAmount"
                    }
                }
            }
        ]);

    return {

        totalPayments,
        successfulPayments,
        pendingPayments,
        failedPayments,
        refundedPayments,
        totalRevenue:revenue[0]?.totalRevenue || 0,
        totalRefund:refund[0]?.totalRefund || 0

    };

};

module.exports = {
    getPendingRestaurants,
    getAllRestaurants,
    approveRestaurant,
    rejectRestaurant,

    getAllDeliveryPartners,
    getPendingDeliveryPartners,
    approveDeliveryPartner,
    rejectDeliveryPartner,

    getDashboard,

    getAllUsers,
    getUserById,
    blockUser,
    unblockUser,
    getRestaurantById,
    getDeliveryPartnerById,
    blockDeliveryPartner,
    unblockDeliveryPartner,
    getAllOrders,
    getOrderById,
    getOrdersByStatus,
    cancelOrder,
    updateOrderStatus,
    getAllPayments,
    getPaymentById,
    getPaymentsByStatus,
    getPaymentStatistics
}