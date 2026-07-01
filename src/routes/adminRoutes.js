const express=require("express");
const router=express.Router();
const adminController=require('../controllers/adminController');
const authMiddleware=require('../middleware/authMiddleware');
const roleMiddleware=require('../middleware/roleMiddleware');
const adminValidate = require("../validations/admin/admin.request");
const validate=require('../middleware/validate');

router.get("/restaurants",authMiddleware,roleMiddleware("ADMIN"),adminController.getAllRestaurants)
router.get("/restaurants/pending",authMiddleware,roleMiddleware("ADMIN"),adminController.getPendingRestaurants);
router.patch("/restaurants/:restaurantId/approve",authMiddleware,roleMiddleware("ADMIN"), validate(adminValidate.approveRestaurantSchema),adminController.approveRestaurant);
router.post("/restaurants/:restaurantId/reject",authMiddleware,roleMiddleware("ADMIN"),validate(adminValidate.rejectRestaurantSchema),adminController.rejectRestaurant);

router.get("/delivery-partners",authMiddleware,roleMiddleware("ADMIN"),adminController.getAllDeliveryPartners);
router.get("/delivery-partners/pending",authMiddleware,roleMiddleware("ADMIN"),adminController.getPendingDeliveryPartners);
router.patch("/delivery-partners/:partnerId/approve",authMiddleware,roleMiddleware("ADMIN"),validate(adminValidate.approveDeliveryPartnerSchema),adminController.approveDeliveryPartner);
router.post("/delivery-partners/:partnerId/reject",authMiddleware,roleMiddleware("ADMIN"),validate(adminValidate.rejectDeliveryPartnerSchema),adminController.rejectDeliveryPartner);

module.exports=router;