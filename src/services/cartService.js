const Cart=require('../models/Cart');
const MenuItem=require('../models/MenuItem');

const addToCart=async(customerId,menuItemId,quantity)=>{
    const menuItem=await MenuItem.findById(menuItemId);

    if(!menuItem){
        throw new Error("menu item not found");
    }
    let cart=await Cart.findOne({customerId});
    if(!cart){
        cart=await Cart.create({
            customerId,
            items:[],
            totalAmount:0
        })
    }
    const existingItem=cart.items.find(
        item=>item.menuItemId.toString()===menuItemId
    );
    if(existingItem){
        existingItem.quantity+=quantity;
    }
    else{
        cart.items.push({
            menuItemId,
            quantity,
            price:menuItem.price
        })
    }

    cart.totalAmount=cart.items.reduce((total,item)=>{
        return total+(item.price*item.quantity)
    },0)
    await cart.save();
    return cart;
}

const getCart = async (customerId) => {

    const cart = await Cart.findOne({customerId}).populate(
        "items.menuItemId",
        "name image isAvailable"
    );

    if (!cart) {
        return {
            items: [],
            totalAmount: 0
        };
    }

    return cart;
};
const updateCartItem = async (customerId, menuItemId, quantity)=> {

    const cart = await Cart.findOne({customerId});

    if (!cart) {
        throw new Error("Cart not found");
    }

    const item = cart.items.find(
        item =>
            item.menuItemId.toString() ===menuItemId
    );

    if (!item) {
        throw new Error("Item not found in cart");
    }

    item.quantity = quantity;

    cart.totalAmount =cart.items.reduce((total, item) =>
                total +item.price * item.quantity,0
        );

    await cart.save();

    return cart;
};

const removeCartItem = async (customerId,menuItemId) => {

    const cart = await Cart.findOne({customerId});

    if (!cart) {
        throw new Error("Cart not found");
    }

    cart.items = cart.items.filter(
        item =>item.menuItemId.toString() !==menuItemId
    );

    cart.totalAmount =cart.items.reduce((total, item) =>
                total +item.price * item.quantity,0
        );

    await cart.save();

    return cart;
};
const clearCart = async (customerId) => {

    const cart = await Cart.findOne({customerId});

    if (!cart) {
        throw new Error("Cart not found");
    }

    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();

    return cart;
};
module.exports={
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart
}