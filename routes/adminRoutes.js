const express=require("express");
const router=express.Router();
const adminController=require('../controller/adminController');
const authMiddleware=require('../middleware/authmiddleware');
const roleMiddleware=require('../middleware/roleMiddleware');

router.get("/restaurants",authMiddleware,roleMiddleware("ADMIN"),adminController.getAllRestaurants)
router.get("/restaurants/pending",authMiddleware,roleMiddleware("ADMIN"),adminController.getPendingRestaurants);
router.patch("/restaurants/:restaurantId/approve",authMiddleware,roleMiddleware("ADMIN"),adminController.approveRestaurant);
router.patch("/restaurants/:restaurantId/reject",authMiddleware,roleMiddleware("ADMIN"),adminController.rejectRestaurant);

router.get("/delivery-partners",authMiddleware,roleMiddleware("ADMIN",adminController.getAllDeliveryPartners));

module.exports=router;