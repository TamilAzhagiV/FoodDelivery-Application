const express=require("express");
const profileController=require('../controllers/profileController');
const authMiddleware=require('../middleware/authMiddleware');
const upload=require('../middleware/uploadMiddleware')
const validate=require('../middleware/validate')
const {updateProfileSchema} = require("../validations/profile/profile.request");

const router=express.Router();

router.get('/',authMiddleware,profileController.getProfile);
router.put("/",authMiddleware,
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
    validate(updateProfileSchema),
    profileController.updateProfile
);
module.exports=router;