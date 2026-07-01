const Order = require("../models/Order");
const socketManager = require("./socketManager");

const registerLocationSocket = (io, socket) => {

    socket.on("location-update", async (data) => {

        try {

            if (typeof data === "string") {
                data = JSON.parse(data);
            }

            const {
                orderId,
                latitude,
                longitude
            } = data;

            if (!orderId || latitude == null || longitude == null) {
                console.log("Invalid location payload");
                return;
            }

            // Find the order
            const order = await Order.findById(orderId);

            if (!order) {
                console.log("Order not found");
                return;
            }

            // Find customer's socket
            const customerSocketId = socketManager.getSocketId(
                order.customerId.toString()
            );

            if (!customerSocketId) {
                console.log("Customer not connected");
                return;
            }

            io.to(customerSocketId).emit(
                "delivery-location",
                {
                    orderId,
                    latitude,
                    longitude
                }
            );

            console.log("Location sent to customer");

        }
        catch (error) {

            console.log(error.message);

        }

    });

};

module.exports = {
    registerLocationSocket
};