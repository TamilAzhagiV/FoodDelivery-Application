const couponService = require("../services/couponService");


const createCoupon = async (req, res) => {
    try {
        const coupon =await couponService.createCoupon(
                req.body,
                req.user.userId
            );

        res.status(201).json({
            success: true,
            message: "Coupon created successfully",
            data: coupon
        });

    } 
    catch (error) {

        if (error.message ==="Coupon code already exists") {
            return res.status(409).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getAllCoupons = async (req, res) => {
    try {

        const {page,limit} = req.query;
        const coupons =await couponService.getAllCoupons(
                page,
                limit
            );

        res.status(200).json({
            success: true,
            data: coupons
        });

    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getCouponById = async (req, res) => {
    try {
        const coupon =await couponService.getCouponById(
                req.params.couponId
            );

        res.status(200).json({
            success: true,
            data: coupon
        });

    }
     catch (error) {
        if (error.message === "Coupon not found") {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

};

const updateCoupon = async (req, res) => {

    try {

        const coupon =await couponService.updateCoupon(
                req.params.couponId,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Coupon updated successfully",
            data: coupon
        });

    } catch (error) {

        if (error.message === "Coupon not found") {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        if (error.message ==="Coupon code already exists") {
            return res.status(409).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const deleteCoupon = async (req, res) => {
    try {
        const coupon =await couponService.deleteCoupon(
                req.params.couponId
            );

        res.status(200).json({
            success: true,
            message: "Coupon deactivated successfully",
            data: coupon
        });

    } catch (error) {

        if (error.message === "Coupon not found") {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        if (error.message === "Coupon is already inactive") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


module.exports={
    createCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon
}