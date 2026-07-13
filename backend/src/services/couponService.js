const Coupon = require("../models/Coupon");
const createCoupon = async (couponData,adminId) => {

    const existingCoupon =await Coupon.findOne({code: couponData.code});

    if (existingCoupon) {
        throw new Error("Coupon code already exists");
    }

    const coupon = await Coupon.create({
        ...couponData,
        createdBy: adminId
    });
    return coupon;
};

const getAllCoupons = async (page = 1,limit = 10) => {
    const skip = (page - 1) * limit;
    const coupons = await Coupon.find().select("-__v")
        .populate(
            "createdBy",
            "fullName email"
        )
        .sort({
            createdAt: -1
        })
        .skip(skip)
        .limit(limit);

    const totalCoupons =await Coupon.countDocuments();
    return {
        coupons,
        pagination: {
            total: totalCoupons,
            page,
            limit,
            totalPages: Math.ceil(totalCoupons / limit)
        }
    };

};

const getCouponById = async (couponId) => {

    const coupon = await Coupon.findById(couponId)
        .populate(
            "createdBy",
            "fullName email"
        );

    if (!coupon) {
        throw new Error("Coupon not found");
    }

    return coupon;

};

const updateCoupon = async (couponId,couponData) => {
    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
        throw new Error("Coupon not found");
    }

    if (couponData.code &&couponData.code !== coupon.code) {
        const existingCoupon =await Coupon.findOne({
                code: couponData.code
            });

        if (existingCoupon) {
            throw new Error("Coupon code already exists");
        }

    }
    const updatedCoupon =await Coupon.findByIdAndUpdate(
            couponId,
            couponData,
            {
                new: true,
                runValidators: true
            }
        ).populate(
            "createdBy",
            "fullName email"
        );

    return updatedCoupon;

};

const deleteCoupon = async (couponId) => {

    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
        throw new Error("Coupon not found");
    }

    if (!coupon.isActive) {
        throw new Error("Coupon is already inactive");
    }

    coupon.isActive = false;

    await coupon.save();

    return coupon;

};


module.exports={
    createCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon
}
