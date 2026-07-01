const express = require("express");
const router = express.Router();

const authMiddleware=require('../middleware/authMiddleware');
const restaurantController =require("../controllers/restaurantController");
const validate=require('../middleware/validate');
const restaurantValidate = require("../validations/restaurant/restaurant.request");


router.get("/",authMiddleware,restaurantController.getAllRestaurants);
router.get("/:restaurantId",authMiddleware,validate(restaurantValidate.getRestaurantByIdSchema),restaurantController.getRestaurantById);
router.get("/:restaurantId/menu",authMiddleware,validate(restaurantValidate.getRestaurantMenuSchema),restaurantController.getRestaurantMenu);
router.get("/search/menu",authMiddleware,validate(restaurantValidate.searchMenuItemsSchema),restaurantController.searchMenuItems);

module.exports = router;