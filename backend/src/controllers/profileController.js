const profileService = require("../services/profileService");
const safeParse = require("../utils/safeParse");
const getProfile = async (req,res) => {
    try {

        const profile =await profileService.getProfile(req.user.userId);

        res.status(200).json({
            success: true,
            role: req.user.role,
            data: profile
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};
const updateProfile = async (req, res) => {
    try {

        // Restaurant
        req.body.address = safeParse(req.body.address);
        req.body.cuisineTypes = safeParse(req.body.cuisineTypes);

        // Customer
        req.body.addresses = safeParse(req.body.addresses);
        req.body.preferences = safeParse(req.body.preferences);

        // Common
        req.body.bankDetails = safeParse(req.body.bankDetails);
        req.body.currentLocation = safeParse(req.body.currentLocation);

        // Restaurant GeoJSON
        if (
            req.body.address?.latitude !== undefined &&
            req.body.address?.longitude !== undefined
        ) {
            req.body.location = {
                type: "Point",
                coordinates: [
                    Number(req.body.address.longitude),
                    Number(req.body.address.latitude)
                ]
            };
        }

        // Customer Profile Image
        if (req.files?.profileImage?.length > 0) {
            req.body.profileImage =
                req.files.profileImage[0].path;
        }

        // Restaurant Images
        if (req.files?.logo?.length > 0) {
            req.body.logo =
                req.files.logo[0].path;
        }

        if (req.files?.coverImage?.length > 0) {
            req.body.coverImage =
                req.files.coverImage[0].path;
        }


        const profile =
            await profileService.updateProfile(
                req.user.userId,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: profile
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getProfile,
    updateProfile
};