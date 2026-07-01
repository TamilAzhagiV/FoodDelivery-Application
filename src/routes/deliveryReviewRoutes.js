const express = require("express");

const router = express.Router();

const deliveryReviewController = require("../controllers/deliveryReviewController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validate = require("../middleware/validate");

const deliveryReviewValidate = require("../validations/review/deliveryReview.request");

router.post("/",authMiddleware,roleMiddleware("CUSTOMER"),validate(deliveryReviewValidate.createDeliveryReviewSchema),deliveryReviewController.createDeliveryReview);
router.get("/",authMiddleware,roleMiddleware("DELIVERY_PARTNER"),validate(deliveryReviewValidate.getDeliveryReviewsSchema),deliveryReviewController.getDeliveryReviews);
router.get("/:reviewId",authMiddleware,roleMiddleware("CUSTOMER","DELIVERY_PARTNER","ADMIN"),validate(deliveryReviewValidate.getDeliveryReviewByIdSchema),deliveryReviewController.getDeliveryReviewById);
router.put("/:reviewId",authMiddleware,roleMiddleware("CUSTOMER"),validate(deliveryReviewValidate.updateDeliveryReviewSchema),deliveryReviewController.updateDeliveryReview);
router.delete("/:reviewId",authMiddleware,roleMiddleware("CUSTOMER"),validate(deliveryReviewValidate.deleteDeliveryReviewSchema),deliveryReviewController.deleteDeliveryReview);

module.exports = router;