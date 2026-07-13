const User = require("../models/User");
const CustomerProfile = require("../models/CustomerProfile");
const Restaurant = require("../models/Restaurant");
const DeliveryPartner = require("../models/DeliveryPartner");
const bcrypt = require("bcryptjs");

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

const changePassword = async (userId,
    {
        currentPassword,
        newPassword
    }) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordValid =await bcrypt.compare(currentPassword,
            user.password
        );

    if (!isPasswordValid) {
        throw new Error("Current password is incorrect");
    }

    const hashedPassword =await bcrypt.hash(newPassword,10);

    user.password = hashedPassword;
    user.refreshToken = null;
    await user.save();
    return;

};

const deleteAccount = async (userId) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.status === "INACTIVE") {
        throw new Error("Account already deleted");
    }

    user.status = "INACTIVE";
    user.refreshToken = null;

    await user.save();

};

const logoutAll = async (userId) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    user.refreshToken = null;

    await user.save();

};

module.exports = {
    getProfile,
    updateProfile,
    changePassword,
    deleteAccount,
    logoutAll
};
