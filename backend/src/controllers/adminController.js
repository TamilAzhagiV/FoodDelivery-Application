const adminService=require('../services/adminService');
const DeliveryPartner = require('../models/DeliveryPartner');

const getPendingRestaurants=async(req,res)=>{
    try{
         const restaurants=await adminService.getPendingRestaurants();
         return res.status(200).json({
            success:true,
            data:restaurants
    })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }   
}

const approveRestaurant=async(req,res)=>{
    try{
        const restaurant=await adminService.approveRestaurant(
            req.params.restaurantId,
            req.user.userId
        );
        return res.status(200).json({
            success:true,
            message:"Restaurant approved successfully",
            data:restaurant

        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const rejectRestaurant=async(req,res)=>{
    try{
        const restaurant =
            await adminService.rejectRestaurant(
                req.params.restaurantId,
                req.user.userId,
                req.body.rejectionReason
            );

        res.status(200).json({
            success: true,
            message: "Restaurant rejected successfully",
            data: restaurant
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message   
        })
    }
}

const getAllRestaurants=async(req,res)=>{
    try{
         const restaurants=await adminService.getAllRestaurants();
         res.status(200).json({
            success:true,
            data:restaurants
         })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
   

}

const getAllDeliveryPartners=async(req,res)=>{
    try{
        const partners=await adminService.getAllDeliveryPartners();
        res.status(200).json({
            success:true,
            data:partners
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
const getPendingDeliveryPartners=async(req,res)=>{
    try{
        const partners=await adminService.getPendingDeliveryPartners();
        console.log(partners);
        res.status(200).json({
            success:true,
            data:partners
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }  
}

const approveDeliveryPartner=async(req,res)=>{
    try{
        const partner=await adminService.approveDeliveryPartner(
            req.params.partnerId,
            req.user.userId
        )
        res.status(200).json({
            success:true,
            data:partner
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const rejectDeliveryPartner=async(req,res)=>{
    try{
        const partner=await adminService.rejectDeliveryPartner(
            req.params.partnerId,
            req.user.userId,
            req.body.rejectionReason
        )
        res.status(200).json({
            success:true,
            data:partner
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getDashboard = async (req, res) => {

    try {
        const dashboard =await adminService.getDashboard();
        res.status(200).json({
            success: true,
            message: "Dashboard fetched successfully",
            data: dashboard
        });

    } 
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getAllUsers = async (req, res) => {

    try {
        const users =await adminService.getAllUsers();

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getUserById = async (req, res) => {
    try {

        const user = await adminService.getUserById(req.params.userId);
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        });

    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const blockUser = async (req, res) => {

    try {

        const user = await adminService.blockUser(
            req.params.userId,
            req.user.userId,
            req.body.blockedReason
        );

        res.status(200).json({
            success: true,
            message: "User blocked successfully",
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const unblockUser = async (req, res) => {
    try {
        const user = await adminService.unblockUser( req.params.userId);
        res.status(200).json({
            success: true,
            message: "User unblocked successfully",
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await adminService.getRestaurantById(req.params.restaurantId);
        res.status(200).json({
            success: true,
            message: "Restaurant fetched successfully",
            data: restaurant
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getDeliveryPartnerById = async (req, res) => {
    try {
        const partner =await adminService.getDeliveryPartnerById(req.params.partnerId);

        res.status(200).json({
            success: true,
            message: "Delivery partner fetched successfully",
            data: partner
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const blockDeliveryPartner = async (req, res) => {
    try {
        const partner =await adminService.blockDeliveryPartner(
                req.params.partnerId,
                req.body.blockedReason
            );

        res.status(200).json({
            success: true,
            message: "Delivery partner blocked successfully",
            data: partner
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const unblockDeliveryPartner = async (req, res) => {

    try {

        const partner =
            await adminService.unblockDeliveryPartner(
                req.params.partnerId
            );

        res.status(200).json({
            success: true,
            message: "Delivery partner unblocked successfully",
            data: partner
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getAllOrders = async (req, res) => {

    try {

        const result =await adminService.getAllOrders(
                req.query.page,
                req.query.limit
            );

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: result
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getOrderById = async (req, res) => {

    try {

        const order =
            await adminService.getOrderById(
                req.params.orderId
            );

        res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getOrdersByStatus = async (req, res) => {
    try {
        const result =await adminService.getOrdersByStatus(
                req.params.status,
                req.query.page,
                req.query.limit
            );

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: result
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const cancelOrder = async (req, res) => {

    try {

        const order =await adminService.cancelOrder(
                req.params.orderId,
                req.user.userId,
                req.body.reason
            );

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            data: order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const updateOrderStatus = async (req, res) => {

    try {

        const order =
            await adminService.updateOrderStatus(
                req.params.orderId,
                req.body.orderStatus
            );

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getAllPayments = async (req, res) => {

    try {

        const result =
            await adminService.getAllPayments(
                req.query.page,
                req.query.limit
            );

        res.status(200).json({
            success: true,
            message: "Payments fetched successfully",
            data: result
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getPaymentById = async (req, res) => {

    try {

        const payment =await adminService.getPaymentById(
                req.params.paymentId
            );

        res.status(200).json({
            success: true,
            message: "Payment fetched successfully",
            data: payment
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getPaymentsByStatus = async (req, res) => {

    try {

        const result =await adminService.getPaymentsByStatus(
                req.params.status,
                req.query.page,
                req.query.limit
            );

        res.status(200).json({
            success: true,
            message: "Payments fetched successfully",
            data: result
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getPaymentStatistics = async (req, res) => {
    try {
        const statistics =await adminService.getPaymentStatistics();
        res.status(200).json({
            success: true,
            message: "Payment statistics fetched successfully",
            data: statistics
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports={
    getPendingRestaurants,
    approveRestaurant,
    rejectRestaurant,
    getAllRestaurants,

    getAllDeliveryPartners,
    getPendingDeliveryPartners,
    approveDeliveryPartner,
    rejectDeliveryPartner,

    getDashboard,

    getAllUsers,
    getUserById,
    blockUser,
    unblockUser,
    getRestaurantById,
    getDeliveryPartnerById,
    blockDeliveryPartner,
    unblockDeliveryPartner,
    getAllOrders,
    getOrderById,
    getOrdersByStatus,
    cancelOrder,
    updateOrderStatus,
    getAllPayments,
    getPaymentById,
    getPaymentsByStatus,
    getPaymentStatistics
}