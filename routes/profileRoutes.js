const express=require("express");
const profileController=require('../controller/profileController');
const authMiddleware=require('../middleware/authmiddleware');

const router=express.Router();

router.get('/',authMiddleware,profileController.getProfile);
router.put('/',authMiddleware,profileController.updateProfile);

module.exports=router;