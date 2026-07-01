require("dotenv").config();

const app = require("./app");


const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
require("./config/redis");

/* Database */
connectDB();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

app.set("io", io);

require("./socket/socket")(io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server Running: http://localhost:${PORT}`);
    console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
});