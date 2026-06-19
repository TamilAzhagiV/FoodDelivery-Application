const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {


    const token = req.header("Authorization")
        ?.replace("Bearer ", "")
        .replace(/"/g, "");

    if (!token) {
        return res.status(401).json({
            message: "Access Denied"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "SecretKey"
        );
        req.user = decoded;
        next();
    } catch (err) {

        console.log("JWT Error:", err.message);

        return res.status(401).json({
            message: "Invalid Token"
        });
    }
};

module.exports = authMiddleware;