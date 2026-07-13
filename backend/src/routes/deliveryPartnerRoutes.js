const express = require("express");

const router = express.Router();

const deliveryPartnerController = require("../controllers/deliveryPartnerController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validate = require("../middleware/validate");

const deliveryPartnerValidation = require("../validations/deliveryPartner/deliveryPartner.request");


router.patch("/status",authMiddleware,roleMiddleware("DELIVERY_PARTNER"),validate(deliveryPartnerValidation.updateAvailabilitySchema),deliveryPartnerController.updateAvailabilityStatus);
router.get("/current-order",authMiddleware,roleMiddleware("DELIVERY_PARTNER"),validate(deliveryPartnerValidation.getCurrentOrderSchema),deliveryPartnerController.getCurrentOrder);
router.get("/history",authMiddleware,roleMiddleware("DELIVERY_PARTNER"),validate(deliveryPartnerValidation.getDeliveryHistorySchema),deliveryPartnerController.getDeliveryHistory);
router.get("/history/:orderId",authMiddleware,roleMiddleware("DELIVERY_PARTNER"),validate(deliveryPartnerValidation.getDeliveryHistoryByIdSchema),deliveryPartnerController.getDeliveryHistoryById);
router.patch("/location",authMiddleware,roleMiddleware("DELIVERY_PARTNER"),validate(deliveryPartnerValidation.updateCurrentLocationSchema),deliveryPartnerController.updateCurrentLocation);
router.get("/earnings",authMiddleware,roleMiddleware("DELIVERY_PARTNER"),validate(deliveryPartnerValidation.getEarningsSchema),deliveryPartnerController.getEarnings);
router.get("/statistics",authMiddleware,roleMiddleware("DELIVERY_PARTNER"), validate(deliveryPartnerValidation.getStatisticsSchema),deliveryPartnerController.getStatistics);
router.get("/dashboard",authMiddleware,roleMiddleware("DELIVERY_PARTNER"),validate(deliveryPartnerValidation.getDashboardSchema),deliveryPartnerController.getDashboard);

module.exports = router;