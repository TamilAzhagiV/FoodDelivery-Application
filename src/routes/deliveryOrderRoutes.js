const express = require("express");
const router = express.Router();
const deliveryOrderController = require("../controllers/deliveryOrderController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validate = require("../middleware/validate");
const deliveryOrderValidate = require("../validations/deliveryOrder/deliveryOrder.request");

router.get("/",authMiddleware,roleMiddleware("DELIVERY_PARTNER"), validate(deliveryOrderValidate.getAvailableOrdersSchema),deliveryOrderController.getAvailableOrders);
router.patch("/:orderId/accept",authMiddleware,roleMiddleware("DELIVERY_PARTNER"),validate(deliveryOrderValidate.acceptDeliveryOrderSchema),deliveryOrderController.acceptDeliveryOrder);
router.patch("/:orderId/pickup",authMiddleware,roleMiddleware("DELIVERY_PARTNER"),validate(deliveryOrderValidate.pickupOrderSchema),deliveryOrderController.pickupOrder);
router.patch("/:orderId/delivered",authMiddleware,roleMiddleware("DELIVERY_PARTNER"),validate(deliveryOrderValidate.deliverOrderSchema),deliveryOrderController.deliverOrder);

module.exports = router;