const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const validate = require("../middleware/validate");

const profileValidate = require("../validations/profile/profile.request");

router.get("/",authMiddleware,profileController.getProfile);

router.put("/",
    authMiddleware,
    upload.fields([
        {
            name: "logo",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        },
        {
            name: "profileImage",
            maxCount: 1
        }
    ]),
    validate(profileValidate.updateProfileSchema),
    profileController.updateProfile
);

router.patch("/change-password",authMiddleware,validate(profileValidate.changePasswordSchema),profileController.changePassword);
router.delete("/",authMiddleware,validate(profileValidate.deleteAccountSchema),profileController.deleteAccount);
router.post("/logout-all",authMiddleware,validate(profileValidate.logoutAllSchema),profileController.logoutAll);

module.exports = router;