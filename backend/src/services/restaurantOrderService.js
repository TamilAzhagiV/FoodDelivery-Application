const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");
const deliveryPartnerService = require("./deliveryPartnerService");
const orderSocket = require("../socket/orderSocket");
const DeliveryPartner = require("../models/DeliveryPartner");

const getRestaurantOrders = async (ownerId) => {
    const restaurant =await Restaurant.findOne({ownerId});

    if (!restaurant) {
        throw new Error("Restaurant not found");
    }

    const orders =await Order.find({
            restaurantId:restaurant._id
        })
        .populate(
            "customerId",
            "fullName email phoneNumber"
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

const acceptOrder = async (ownerId,orderId,io) => {
    const restaurant =await Restaurant.findOne({
            ownerId
        });

    if (!restaurant) {
        throw new Error("Restaurant not found");
    }

    const order =await Order.findOne({
        _id: orderId,
        restaurantId:restaurant._id
        });

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.orderStatus !=="PLACED") {
        throw new Error(
            "Only placed orders can be accepted"
        );
    }

    order.orderStatus ="ACCEPTED";
    await order.save();
    orderSocket.notifyOrderAccepted(io, order);
    return order;
};

const startPreparingOrder = async (ownerId,orderId,io) => {
    const restaurant =await Restaurant.findOne({
            ownerId
        });

    if (!restaurant) {
        throw new Error("Restaurant not found");
    }

    const order =await Order.findOne({
            _id: orderId,
            restaurantId:restaurant._id
        });

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.orderStatus !=="ACCEPTED") {
        throw new Error("Only accepted orders can be prepared");
    }

    order.orderStatus ="PREPARING";
    await order.save();
    orderSocket.notifyOrderPreparing(io, order);
    return order;
};

const markOrderReady = async (ownerId,orderId,io) => {
    const restaurant =await Restaurant.findOne({
            ownerId
        });

    if (!restaurant) {
        throw new Error("Restaurant not found");
    }

    const order =await Order.findOne({
            _id: orderId,
            restaurantId:restaurant._id
    });

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.orderStatus !=="PREPARING") {
        throw new Error("Only preparing orders can be marked ready");
    }

    order.orderStatus ="READY_FOR_PICKUP";
    await order.save();
    orderSocket.notifyOrderReady(io,order);
    const deliveryPartners =await deliveryPartnerService.getNearestDeliveryPartners(
        restaurant.location.coordinates[0],
        restaurant.location.coordinates[1],
        restaurant.deliveryRadius * 1000
    );
    await DeliveryPartner.updateMany(
    {
        _id: {
            $in: deliveryPartners.map(
                partner => partner._id
            )
        }
    },
    {
        $inc: {
            totalOrdersOffered: 1
        }
    }
);
    orderSocket.notifyNearbyDeliveryPartners(io,order,deliveryPartners);

    return order;
};

module.exports = {
    getRestaurantOrders,
    acceptOrder,
    startPreparingOrder,
    markOrderReady
};
