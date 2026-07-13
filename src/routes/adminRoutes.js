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

router.get("/dashboard",authMiddleware,roleMiddleware("ADMIN"),validate(adminValidate.getDashboardSchema),adminController.getDashboard);

router.get( "/users",authMiddleware, roleMiddleware("ADMIN"), validate(adminValidate.getAllUsersSchema),adminController.getAllUsers);
router.get("/users/:userId",authMiddleware,roleMiddleware("ADMIN"),validate(adminValidate.getUserByIdSchema),adminController.getUserById);
router.patch("/users/:userId/block",authMiddleware,roleMiddleware("ADMIN"),validate(adminValidate.blockUserSchema),adminController.blockUser);
router.patch( "/users/:userId/unblock",authMiddleware,roleMiddleware("ADMIN"),validate(adminValidate.unblockUserSchema),adminController.unblockUser);
router.get("/restaurants/:restaurantId",authMiddleware,roleMiddleware("ADMIN"),validate(adminValidate.getRestaurantByIdSchema),adminController.getRestaurantById);
router.get("/delivery-partners/:partnerId",authMiddleware,roleMiddleware("ADMIN"),validate(adminValidate.getDeliveryPartnerByIdSchema),adminController.getDeliveryPartnerById);
router.patch("/delivery-partners/:partnerId/block",authMiddleware,roleMiddleware("ADMIN"),validate(adminValidate.blockDeliveryPartnerSchema),adminController.blockDeliveryPartner);
router.patch("/delivery-partners/:partnerId/unblock",authMiddleware,roleMiddleware("ADMIN"),validate(adminValidate.unblockDeliveryPartnerSchema),adminController.unblockDeliveryPartner);
router.get("/orders",authMiddleware,roleMiddleware("ADMIN"),validate(adminValidate.getAllOrdersSchema),adminController.getAllOrders);
router.get("/orders/:orderId",authMiddleware,roleMiddleware("ADMIN"),validate(adminValidate.getOrderByIdSchema),adminController.getOrderById);
router.get("/orders/status/:status",authMiddleware,roleMiddleware("ADMIN"),validate(adminValidate.getOrdersByStatusSchema),adminController.getOrdersByStatus);
router.patch("/orders/:orderId/cancel",authMiddleware,roleMiddleware("ADMIN"),validate(adminValidate.cancelOrderSchema),adminController.cancelOrder);
router.patch("/orders/:orderId/status",authMiddleware,roleMiddleware("ADMIN"),validate(adminValidate.updateOrderStatusSchema),adminController.updateOrderStatus);
router.get("/payments",authMiddleware,roleMiddleware("ADMIN"),validate(adminValidate.getAllPaymentsSchema),adminController.getAllPayments);
router.get("/payments/:paymentId",authMiddleware,roleMiddleware("ADMIN"),validate(adminValidate.getPaymentByIdSchema),adminController.getPaymentById);
router.get("/payments/status/:status",authMiddleware,roleMiddleware("ADMIN"),validate(adminValidate.getPaymentsByStatusSchema),adminController.getPaymentsByStatus);
router.get("/payments/statistics",authMiddleware,roleMiddleware("ADMIN"),validate(adminValidate.getPaymentStatisticsSchema),adminController.getPaymentStatistics);


module.exports=router;