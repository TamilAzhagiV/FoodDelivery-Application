const express = require("express");
const router = express.Router();

const orderController =require("../controllers/orderController");
const authMiddleware =require("../middleware/authMiddleware");
const roleMiddleware =require("../middleware/roleMiddleware");
const validate = require("../middleware/validate");
const orderValidate = require("../validations/order/order.request");

router.post("/",authMiddleware,roleMiddleware("CUSTOMER"),validate(orderValidate.placeOrderSchema),orderController.placeOrder);
router.get("/",authMiddleware,roleMiddleware("CUSTOMER"),orderController.getOrders);
router.get("/:orderId",authMiddleware,roleMiddleware("CUSTOMER"),validate(orderValidate.getOrderByIdSchema),orderController.getOrderById);
router.patch("/:orderId/cancel",authMiddleware,roleMiddleware("CUSTOMER"),validate(orderValidate.cancelOrderSchema),orderController.cancelOrder);

module.exports = router;