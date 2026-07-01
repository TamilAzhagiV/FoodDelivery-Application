const express = require("express");
const router =express.Router();
const authMiddleware =require("../middleware/authMiddleware");
const roleMiddleware =require("../middleware/roleMiddleware");
const restaurantOrderController =require("../controllers/restaurantOrderController");
const validate=require('../middleware/validate')
const restaurantOrderValidate = require("../validations/restaurantOrder/restaurantOrder.request");

router.get("/orders",authMiddleware,roleMiddleware("RESTAURANT_OWNER"),restaurantOrderController.getRestaurantOrders);
router.patch("/orders/:orderId/accept",authMiddleware,roleMiddleware("RESTAURANT_OWNER"),validate(restaurantOrderValidate.acceptOrderSchema),restaurantOrderController.acceptOrder);
router.patch("/orders/:orderId/preparing",authMiddleware,roleMiddleware("RESTAURANT_OWNER"),validate(restaurantOrderValidate.startPreparingOrderSchema),restaurantOrderController.startPreparingOrder);
router.patch("/orders/:orderId/ready",authMiddleware,roleMiddleware("RESTAURANT_OWNER"),validate(restaurantOrderValidate.markOrderReadySchema),restaurantOrderController.markOrderReady);

module.exports = router;