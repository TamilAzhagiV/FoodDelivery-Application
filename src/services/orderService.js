const Order = require("../models/Order");
const Cart = require("../models/Cart");
const MenuItem = require("../models/MenuItem");

const placeOrder = async (customerId) => {

    const cart = await Cart.findOne({customerId});

    if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
    }

    const firstMenuItem =await MenuItem.findById(cart.items[0].menuItemId);
    if (!firstMenuItem) {
    throw new Error("Menu item not found");
}
    const order =await Order.create({
            customerId,
            restaurantId:firstMenuItem.restaurantId,
            items: cart.items,
            totalAmount:cart.totalAmount
        });

    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    return order;
};

const getOrders = async (customerId) => {

    const orders = await Order.find({customerId })
    .populate(
        "restaurantId",
        "restaurantName"
    )
    .populate(
        "items.menuItemId",
        "name image"
    )
    .sort({
        createdAt: -1
    });

    return orders;
};

const getOrderById = async (customerId,orderId) => {
    const order = await Order.findOne({
        _id: orderId,
        customerId
    })
    .populate(
        "restaurantId",
        "restaurantName"
    )
    .populate(
        "items.menuItemId",
        "name image"
    );

    if (!order) {
        throw new Error("Order not found");
    }

    return order;
};

const cancelOrder = async (customerId,orderId) => {
    const order = await Order.findOne({
        _id: orderId,
        customerId
    });

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.orderStatus !== "PLACED") {
        throw new Error("Order cannot be cancelled");
    }
    order.orderStatus ="CANCELLED";
    await order.save();
    return order;
};


module.exports = {
    placeOrder,
    getOrders,
    getOrderById,
    cancelOrder
};