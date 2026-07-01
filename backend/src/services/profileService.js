const User = require("../models/User");
const CustomerProfile = require("../models/CustomerProfile");
const Restaurant = require("../models/Restaurant");
const DeliveryPartner = require("../models/DeliveryPartner");

const getProfile = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    switch (user.role) {

        case "CUSTOMER":
            return await CustomerProfile
                .findOne({ userId })
                .populate("userId", "fullName email phoneNumber");

        case "RESTAURANT_OWNER":
            return await Restaurant
                .findOne({ ownerId: userId })
                .populate("ownerId", "fullName email phoneNumber");

        case "DELIVERY_PARTNER":
            return await DeliveryPartner
                .findOne({ userId })
                .populate("userId", "fullName email phoneNumber");

        case "ADMIN":
            return user;

        default:
            throw new Error("Invalid role");
    }
};

const updateProfile = async (userId, profileData) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }
    switch (user.role) {

        case "CUSTOMER":
            return await CustomerProfile.findOneAndUpdate(
                { userId },
                profileData,
                {
                    returnDocument: "after",
                    upsert: true,
                    runValidators: true
                }
            );

        case "RESTAURANT_OWNER":
            profileData.isProfileCompleted = true;
            const restaurant= await Restaurant.findOneAndUpdate(
                { ownerId: userId },
                profileData,
                {
                    returnDocument: "after",
                    upsert: true,
                    runValidators: true
                }
            );
            return restaurant;

        case "DELIVERY_PARTNER":
            profileData.isProfileCompleted = true;
            return await DeliveryPartner.findOneAndUpdate(
                { userId },
                profileData,
                {
                    returnDocument: "after",
                    upsert: true,
                    runValidators: true
                }
            );

        case "ADMIN":
            throw new Error("Admin profile update not supported");

        default:
            throw new Error("Invalid role");
    }
};

module.exports = {
    getProfile,
    updateProfile
};