const socketManager = require("./socketManager");
const { registerLocationSocket } = require("./locationSocket");

const registerSocketEvents = (io) => {

    io.on("connection", (socket) => {

        console.log(`Socket Connected: ${socket.id}`);

        // Register Live Location Events
        registerLocationSocket(io, socket);

        // Register User
        socket.on("register-user", (data) => {

            try {

                // Handle Postman (string payload)
                if (typeof data === "string") {
                    data = JSON.parse(data);
                }

                const { userId, role } = data;

                if (!userId || !role) {
                    console.log("Invalid register-user payload");
                    return;
                }

                socketManager.addUser(
                    userId,
                    socket.id,
                    role
                );

                console.log(`User Registered: ${userId}`);
                console.log(socketManager.getConnectedUsers());

            } catch (error) {

                console.log("Socket Register Error:", error.message);

            }

        });

        // Disconnect
        socket.on("disconnect", () => {

            socketManager.removeUser(socket.id);

            console.log(`Socket Disconnected: ${socket.id}`);

        });

    });

};

module.exports = registerSocketEvents;