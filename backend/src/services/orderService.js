const Order = require("../models/Order");
const Cart = require("../models/Cart");
const MenuItem = require("../models/MenuItem");
const Payment = require("../models/Payment");

const { calculatePrice } = require("./priceService");


const createOrderFromCart = async (
    customerId,
    cart,
    restaurantId,
    paymentMethod,
    paymentStatus = "PENDING",
    paymentId = null,
    session = null
) => {

    const price = calculatePrice(cart.totalAmount);
    const [order] = await Order.create(
        [{
            customerId,
            restaurantId,
            paymentId,
            paymentMethod,
            paymentStatus,
            orderStatus: "PLACED",

            items: cart.items,

            foodTotal: price.foodTotal,
            gst: price.gst,
            deliveryFee: price.deliveryFee,
            deliveryPartnerEarnings: price.deliveryPartnerEarnings,
            platformCommission: price.platformCommission,
            platformFee: price.platformFee,
            discount: price.discount,
            totalAmount: price.totalAmount
        }],
        { session }
    );

    cart.items = [];
    cart.totalAmount = 0;

    await cart.save({ session });

    return order;
};

const placeOrder = async (customerId) => {

    const cart = await Cart.findOne({ customerId });

    if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
    }

    const firstMenuItem = await MenuItem.findById(
        cart.items[0].menuItemId
    );

    if (!firstMenuItem) {
        throw new Error("Menu item not found");
    }

    const price = calculatePrice(cart.totalAmount);

    const payment = await Payment.create({
        customerId,
        amount: price.totalAmount,
        currency: "INR",
        paymentMethod: "COD",
        paymentStatus: "PENDING"
    });
    const order = await createOrderFromCart(
        customerId,
        cart,
        firstMenuItem.restaurantId,
        "COD",
        "PENDING",
        payment._id
    );
    payment.orderId = order._id;
    await payment.save();

    return {
        message: "Order placed successfully",
        data: order
    };
};

const getOrders = async (customerId) => {

    const orders = await Order.find({ customerId })
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

const getOrderById = async ( customerId,orderId) => {
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

    order.orderStatus = "CANCELLED";
    await order.save();
    return order;
};

module.exports = {
    placeOrder,
    createOrderFromCart,
    getOrders,
    getOrderById,
    cancelOrder
};