const socketManager = require("./socketManager");

const notifyDeliveryAssigned = (io, order) => {

    // Customer
    const customerSocketId = socketManager.getSocketId(
        order.customerId.toString()
    );

    if (customerSocketId) {

        io.to(customerSocketId).emit(
            "delivery-assigned",
            order
        );

    }

};

const notifyOrderPickedUp = (io, order) => {

    const customerSocketId = socketManager.getSocketId(
        order.customerId.toString()
    );

    if (customerSocketId) {

        io.to(customerSocketId).emit(
            "order-picked-up",
            order
        );

    }

};

const notifyOrderDelivered = (io, order) => {

    const customerSocketId = socketManager.getSocketId(
        order.customerId.toString()
    );

    if (customerSocketId) {

        io.to(customerSocketId).emit(
            "order-delivered",
            order
        );

    }

};

module.exports = {
    notifyDeliveryAssigned,
    notifyOrderPickedUp,
    notifyOrderDelivered
};