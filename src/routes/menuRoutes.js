const express=require("express");
const router=express.Router();

const menuController=require("../controllers/menuController");
const authMiddleware=require("../middleware/authMiddleware");
const roleMiddleware=require("../middleware/roleMiddleware");
const menuValidate = require("../validations/menu/menu.request");
const validate = require("../middleware/validate");
const upload=require('../middleware/uploadMiddleware')

router.post("/",authMiddleware,roleMiddleware("RESTAURANT_OWNER"),upload.fields([
        {
            name: "image",
            maxCount: 1
        }
    ]),validate(menuValidate.createMenuItemSchema),menuController.createMenuItem);
router.get("/",authMiddleware,roleMiddleware("RESTAURANT_OWNER"),roleMiddleware("RESTAURANT_OWNER"),menuController.getRestaurantMenu);
router.get("/:menuItemId",authMiddleware,roleMiddleware("RESTAURANT_OWNER"),validate(menuValidate.getMenuItemByIdSchema),menuController.getMenuItemById);
router.put('/:menuItemId',authMiddleware,roleMiddleware("RESTAURANT_OWNER"),upload.fields([
        {
            name: "image",
            maxCount: 1
        }
    ]),validate(menuValidate.updateMenuItemSchema),menuController.updateMenuItem);
router.delete("/:menuItemId",authMiddleware,roleMiddleware("RESTAURANT_OWNER"),validate(menuValidate.deleteMenuItemSchema),menuController.deleteMenuItem);

module.exports=router;
