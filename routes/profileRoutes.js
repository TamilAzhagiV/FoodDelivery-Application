const express=require("express");
const profileController=require('../controller/profileController');
const authMiddleware=require('../middleware/authmiddleware');
const upload=require('../middleware/uploadMiddleware')

const router=express.Router();

router.get('/',authMiddleware,profileController.getProfile);
router.put(
    "/",
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
    profileController.updateProfile
);
module.exports=router;