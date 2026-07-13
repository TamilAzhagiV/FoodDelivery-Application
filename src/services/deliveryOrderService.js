const Order = require("../models/Order");
const Payment = require("../models/Payment");
const deliveryOrderSocket = require("../socket/deliveryOrderSocket");

const {validateDeliveryPartner} = require("./deliveryPartnerService");

const getAvailableOrders = async () => {

    const orders = await Order.find({
        orderStatus: "READY_FOR_PICKUP",
        deliveryPartnerId: null
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
            "items.menuItemId",
            "name image"
        )
        .sort({
            createdAt: -1
        });

    return orders;

};

const acceptDeliveryOrder = async (userId,orderId,io) => {

    const deliveryPartner = await validateDeliveryPartner(userId);

    if (deliveryPartner.availabilityStatus !== "ONLINE") {
        throw new Error("Delivery partner is offline");
    }

    const order = await Order.findOneAndUpdate(
        {
            _id: orderId,
            orderStatus: "READY_FOR_PICKUP",
            deliveryPartnerId: null
        },
        {
            $set: {
                deliveryPartnerId: deliveryPartner._id,
                orderStatus: "OUT_FOR_DELIVERY"
            }
        },
        {
            new: true
        }
    );

    if (!order) {
        throw new Error("Order not found or already accepted");
    }
    deliveryPartner.acceptedOrders += 1;
    deliveryPartner.availabilityStatus = "BUSY";
    deliveryPartner.lastActiveAt = new Date();

    await deliveryPartner.save();

    deliveryOrderSocket.notifyDeliveryAssigned(io,order);

    return order;
};

const pickupOrder = async (userId,orderId,io) => {

    const deliveryPartner = await validateDeliveryPartner(userId);

    const order = await Order.findOne({
        _id: orderId,
        deliveryPartnerId: deliveryPartner._id
    });

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.orderStatus !== "OUT_FOR_DELIVERY") {
        throw new Error("Order is not out for delivery");
    }

    order.pickedUpAt = new Date();

    await order.save();

    deliveryOrderSocket.notifyOrderPickedUp(io, order);

    return order;

};

const deliverOrder = async (userId,orderId,io) => {

    const deliveryPartner = await validateDeliveryPartner(userId);

    const order = await Order.findOne({
        _id: orderId,
        deliveryPartnerId: deliveryPartner._id
    });

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.orderStatus !== "OUT_FOR_DELIVERY") {
        throw new Error("Order is not out for delivery");
    }

    order.orderStatus = "DELIVERED";
    order.deliveredAt = new Date();

    if (order.paymentMethod === "COD") {

    const payment = await Payment.findById(
        order.paymentId
    );

    if (!payment) {
        throw new Error("Payment not found");
    }

    payment.paymentStatus = "SUCCESS";
    payment.paidAt = new Date();

    await payment.save();

   
    order.paymentStatus = "SUCCESS";
}

    await order.save();

    deliveryPartner.availabilityStatus = "ONLINE";

    deliveryPartner.completedDeliveries += 1;
    deliveryPartner.totalDeliveries += 1;

    deliveryPartner.earningsToday += order.deliveryPartnerEarnings;
    deliveryPartner.earningsThisMonth += order.deliveryPartnerEarnings;
    deliveryPartner.totalEarnings += order.deliveryPartnerEarnings;

    deliveryPartner.lastActiveAt = new Date();

    await deliveryPartner.save();

    deliveryOrderSocket.notifyOrderDelivered(io, order);

    return order;

};

module.exports = {
    getAvailableOrders,
    acceptDeliveryOrder,
    pickupOrder,
    deliverOrder
};