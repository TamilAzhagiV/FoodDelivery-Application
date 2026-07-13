const express = require("express");

const router = express.Router();

const restaurantReviewController = require("../controllers/restaurantReviewController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validate = require("../middleware/validate");

const restaurantReviewValidate = require("../validations/review/restaurantReview.request");

router.post("/",authMiddleware,roleMiddleware("CUSTOMER"),validate(restaurantReviewValidate.createRestaurantReviewSchema),restaurantReviewController.createRestaurantReview);
router.get("/",authMiddleware,roleMiddleware("RESTAURANT_OWNER"),validate(restaurantReviewValidate.getRestaurantReviewsSchema),restaurantReviewController.getRestaurantReviews);
router.get("/:reviewId",authMiddleware,roleMiddleware("RESTAURANT_OWNER", "CUSTOMER", "ADMIN"),validate(restaurantReviewValidate.getRestaurantReviewByIdSchema),restaurantReviewController.getRestaurantReviewById);
router.put("/:reviewId",authMiddleware,roleMiddleware("CUSTOMER"),validate(restaurantReviewValidate.updateRestaurantReviewSchema),restaurantReviewController.updateRestaurantReview);
router.delete("/:reviewId",authMiddleware,roleMiddleware("CUSTOMER"),validate(restaurantReviewValidate.deleteRestaurantReviewSchema),restaurantReviewController.deleteRestaurantReview);

module.exports = router;