import { io } from "socket.io-client";

const SOCKET_URL = "http://192.168.1.22:3000";

let socket = null;

export function connectSocket() {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      auth: {
        token: localStorage.getItem("accessToken"),
      },
    });
  }

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function emitLocationUpdate({ orderId, latitude, longitude }) {
  const activeSocket = connectSocket();

  activeSocket.emit("location-update", {
    orderId,
    latitude,
    longitude,
  });
}

export function listenDeliveryLocation(callback) {
  const activeSocket = connectSocket();

  activeSocket.on("delivery-location", callback);

  return () => {
    activeSocket.off("delivery-location", callback);
  };
}