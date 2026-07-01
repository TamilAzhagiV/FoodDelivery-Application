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

    // Notify All Active Delivery Partners
    const deliveryPartners =
        socketManager.getDeliveryPartners();

    for (const partner of deliveryPartners) {

        io.to(partner.socketId).emit(
            "new-order",
            order
        );

    }

};

module.exports = {
    notifyOrderAccepted,
    notifyOrderPreparing,
    notifyOrderReady
};