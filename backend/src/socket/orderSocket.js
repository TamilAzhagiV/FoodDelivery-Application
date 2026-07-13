const socketManager = require("./socketManager");

const notifyOrderAccepted = (io, order) => {

    const customerSocketId = socketManager.getSocketId(
        order.customerId.toString()
    );

    if (customerSocketId) {

        io.to(customerSocketId).emit(
            "order-accepted",
            order
        );

    }

};

const notifyOrderPreparing = (io, order) => {

    const customerSocketId = socketManager.getSocketId(
        order.customerId.toString()
    );

    if (customerSocketId) {

        io.to(customerSocketId).emit(
            "order-preparing",
            order
        );

    }

};

const notifyOrderReady = (io, order) => {

    // Notify Ordered Customer
    const customerSocketId = socketManager.getSocketId(
        order.customerId.toString()
    );

    if (customerSocketId) {

        io.to(customerSocketId).emit(
            "order-ready",
            order
        );

    }
};

const notifyNearbyDeliveryPartners = (io,order,deliveryPartners) => {

    for (const partner of deliveryPartners) {

        const socketId = socketManager.getSocketId(
            partner.userId.toString()
        );

        if (!socketId) {
            continue;
        }

        io.to(socketId).emit(
            "new-order",
            order
        );

    }

};

module.exports = {
    notifyOrderAccepted,
    notifyOrderPreparing,
    notifyOrderReady,
    notifyNearbyDeliveryPartners
};