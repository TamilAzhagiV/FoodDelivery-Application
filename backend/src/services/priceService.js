const calculatePrice = (foodTotal, coupon = null) => {

    const gst = Number((foodTotal * 0.05).toFixed(2));
    const deliveryFee =foodTotal >= 300 ? 0 : 40;
    const deliveryPartnerEarnings =Math.round(deliveryFee * 0.75);
    const platformCommission =deliveryFee - deliveryPartnerEarnings;
    const platformFee = 5;
    let discount = 0;
    if (coupon) {
        if (coupon.discountType === "FLAT") {
            discount = coupon.discountValue;
        } else {
            discount =(foodTotal * coupon.discountValue) / 100;
            if (coupon.maximumDiscount && discount > coupon.maximumDiscount) {
                discount = coupon.maximumDiscount;
            }
        }
    }

    const totalAmount =foodTotal +gst +deliveryFee +platformFee -discount;
    return {
        foodTotal,
        gst,
        deliveryFee,
        deliveryPartnerEarnings,
        platformCommission,
        platformFee,
        discount,
        totalAmount
    };

};

module.exports = {
    calculatePrice
};