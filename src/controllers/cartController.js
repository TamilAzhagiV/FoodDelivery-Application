const cartService=require('../services/cartService');

const addToCart=async(req,res)=>{
    try{
        const cart=await cartService.addToCart(
            req.user.userId,
            req.body.menuItemId,
            req.body.quantity
        )
        res.status(200).json({
            success:true,
            message:"Item added to cart",
            data:cart
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getCart = async (req, res) => {
    try {

        const cart = await cartService.getCart(req.user.userId);

        res.status(200).json({
            success: true,
            data: cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const updateCartItem = async (req,res) => {
    try {

        const cart =await cartService.updateCartItem(
                req.user.userId,
                req.params.menuItemId,
                req.body.quantity
            );

        res.status(200).json({
            success: true,
            message:"Cart updated successfully",
            data: cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const removeCartItem = async (req,res) => {
    try {

        const cart =await cartService.removeCartItem(
                req.user.userId,
                req.params.menuItemId
            );

        res.status(200).json({
            success: true,
            message:"Item removed from cart",
            data: cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const clearCart = async (req,res) => {
    try {

        const cart =await cartService.clearCart(req.user.userId);

        res.status(200).json({
            success: true,
            message:"Cart cleared successfully",
            data: cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports={
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart
}