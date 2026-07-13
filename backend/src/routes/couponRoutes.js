const express = require("express");
const router = express.Router();

const couponController =require("../controllers/couponController");
const authMiddleware =require("../middleware/authMiddleware");
const roleMiddleware =require("../middleware/roleMiddleware");
const validate =require("../middleware/validate");
const couponValidate =require("../validations/coupon/coupon.request");

router.post("/",authMiddleware,roleMiddleware("ADMIN"),validate(couponValidate.createCouponSchema),couponController.createCoupon);
router.get("/",authMiddleware,roleMiddleware("ADMIN"),validate(couponValidate.getAllCouponsSchema),couponController.getAllCoupons);
router.get("/:couponId",authMiddleware,roleMiddleware("ADMIN"),validate(couponValidate.getCouponByIdSchema),couponController.getCouponById);
router.patch("/:couponId",authMiddleware,roleMiddleware("ADMIN"),validate(couponValidate.updateCouponSchema),couponController.updateCoupon);
router.delete("/:couponId",authMiddleware,roleMiddleware("ADMIN"),validate(couponValidate.deleteCouponSchema),couponController.deleteCoupon);

module.exports = router;