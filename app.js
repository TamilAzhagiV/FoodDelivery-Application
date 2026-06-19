require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const adminRoutes = require("./routes/adminRoutes");

const swaggerSpec = require("./swagger/swagger");

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Swagger */
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));

/* Routes */
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/admin", adminRoutes);

/* Health Check */
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Food Delivery API Running"
    });
});

module.exports = app;