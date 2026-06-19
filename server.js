require("dotenv").config();

const app = require("./app");

const connectDB = require("./config/db");
require("./config/redis");

/* Database */
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running: http://localhost:${PORT}`);
    console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
});