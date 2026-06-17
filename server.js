require("dotenv").config();
const express = require("express");
const connectDB =require("./config/db");
const authRoutes =require("./routes/authRoutes");
const profileRoutes=require('./routes/profileRoutes');
const swaggerUi =require("swagger-ui-express");
const swaggerSpec =require("./swagger/swagger");
const cors=require('cors');
require('./config/redis')

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))
connectDB();

app.use("/auth",authRoutes);
app.use("/profile",profileRoutes);
const PORT =process.env.PORT || 3000;
app.listen(PORT, () =>
     {
        console.log(`Server running on port http://localhost:${PORT}`);
        console.log(`SWAGGER ${'http://localhost:3000/api-docs'}`)
});