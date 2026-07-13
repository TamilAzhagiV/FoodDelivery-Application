const connectedUsers = new Map();

const addUser = (userId, socketId, role) => {

    connectedUsers.set(userId, {
        socketId,
        role
    });

};

const removeUser = (socketId) => {

    for (const [userId, user] of connectedUsers.entries()) {

        if (user.socketId === socketId) {
            connectedUsers.delete(userId);
            break;
        }

    }

};

const getSocketId = (userId) => {

    const user = connectedUsers.get(userId);

    return user ? user.socketId : null;

};

const getConnectedUsers = () => {
    return connectedUsers;
};

const getDeliveryPartners = () => {

    return [...connectedUsers.values()].filter(
        (user) => user.role === "DELIVERY_PARTNER"
    );

};

module.exports = {
    addUser,
    removeUser,
    getSocketId,
    getConnectedUsers,
    getDeliveryPartners
};