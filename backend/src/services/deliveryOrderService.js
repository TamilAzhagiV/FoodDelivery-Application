const Order = require("../models/Order");
const deliveryOrderSocket = require("../socket/deliveryOrderSocket");

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

const acceptDeliveryOrder = async (
    deliveryPartnerId,
    orderId,
    io
) => {

    const order = await Order.findById(orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.orderStatus !== "READY_FOR_PICKUP") {
        throw new Error(
            "Order is not ready for pickup"
        );
    }

    if (order.deliveryPartnerId) {
        throw new Error(
            "Order already accepted"
        );
    }

    order.deliveryPartnerId = deliveryPartnerId;
    order.orderStatus = "OUT_FOR_DELIVERY";

    await order.save();
    deliveryOrderSocket.notifyDeliveryAssigned(io,order);
    return order;

};

const pickupOrder = async (
    deliveryPartnerId,
    orderId,
    io
) => {

    const order = await Order.findOne({
        _id: orderId,
        deliveryPartnerId
    });

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.orderStatus !== "OUT_FOR_DELIVERY") {
        throw new Error(
            "Order is not out for delivery"
        );
    }

    order.pickedUpAt = new Date();
    await order.save();
    deliveryOrderSocket.notifyOrderPickedUp(io,order);
    return order;

};

const deliverOrder = async (
    deliveryPartnerId,
    orderId,
    io
) => {

    const order = await Order.findOne({
        _id: orderId,
        deliveryPartnerId
    });

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.orderStatus !== "OUT_FOR_DELIVERY") {
        throw new Error(
            "Order is not out for delivery"
        );
    }

    order.orderStatus = "DELIVERED";
    order.deliveredAt = new Date();

    await order.save();
    deliveryOrderSocket.notifyOrderDelivered(io,order);
    return order;

};

module.exports = {
    getAvailableOrders,
    acceptDeliveryOrder,
    pickupOrder,
    deliverOrder
};