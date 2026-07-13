require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const rateLimiter =require("./middleware/rateLimiter");
const morganMiddleware =require("./middleware/morganMiddleware");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const adminRoutes = require("./routes/adminRoutes");
const menuRoutes=require('./routes/menuRoutes');
const restaurantRoutes =require("./routes/restaurantRoutes");
const cartRoutes=require('./routes/cartRoutes');
const orderRoutes = require("./routes/orderRoutes");
const restaurantOrderRoutes=require('./routes/restaurantOrderRoutes');
const deliveryOrderRoutes = require("./routes/deliveryOrderRoutes");
const restaurantReviewRoutes = require("./routes/restaurantReviewRoutes");
const deliveryReviewRoutes = require("./routes/deliveryReviewRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const deliveryPartnerRoutes = require("./routes/deliveryPartnerRoutes"); 
const couponRoutes = require("./routes/couponRoutes");

const swaggerSpec = require("./swagger/swagger");

const app = express();
app.use(helmet());

app.use("/payments/webhook",express.raw({
        type: "application/json"
    })
);

app.use(cors());
app.use(rateLimiter);
app.use(morganMiddleware);
app.use(express.json());


app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});



app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/admin", adminRoutes);
app.use('/menu',menuRoutes);
app.use("/restaurants",restaurantRoutes);
app.use("/cart",cartRoutes);
app.use("/orders",orderRoutes);
app.use('/restaurant',restaurantOrderRoutes);
app.use("/delivery-orders", deliveryOrderRoutes);
app.use("/restaurant-reviews", restaurantReviewRoutes);
app.use("/delivery-reviews", deliveryReviewRoutes);
app.use("/payments", paymentRoutes);
app.use("/delivery-partner", deliveryPartnerRoutes);
app.use("/api/admin/coupons", couponRoutes);


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Food Delivery API Running"
    });
});

module.exports = app;