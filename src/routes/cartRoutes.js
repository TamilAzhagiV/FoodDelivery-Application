const express=require("express");
const router=express.Router();

const cartController=require("../controllers/cartController");
const authMiddleware=require('../middleware/authMiddleware');
const roleMiddleware=require('../middleware/roleMiddleware');
const validate = require("../middleware/validate");
const cartValidate = require("../validations/cart/cart.request");

router.post('/add',authMiddleware,roleMiddleware("CUSTOMER"),validate(cartValidate.addToCartSchema),cartController.addToCart);
router.get("/",authMiddleware,roleMiddleware("CUSTOMER"),cartController.getCart);
router.put("/item/:menuItemId",authMiddleware,roleMiddleware("CUSTOMER"),validate(cartValidate.updateCartItemSchema),cartController.updateCartItem);
router.delete("/item/:menuItemId",authMiddleware,roleMiddleware("CUSTOMER"),validate(cartValidate.removeCartItemSchema),cartController.removeCartItem);
router.delete("/clear",authMiddleware,roleMiddleware("CUSTOMER"),cartController.clearCart);

module.exports = router;