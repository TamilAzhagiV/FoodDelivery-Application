import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import ForgotPassword from "../features/auth/pages/ForgetPassword";
import VerifyOtp from "../features/auth/pages/VerifyOtp";
import ResetPassword from "../features/auth/pages/ResetPassword";

import CustomerDashboard from "../pages/customer/CustomerDashboard";
import CustomerHome from "../pages/customer/CustomerHome";
import CustomerProfile from "../pages/customer/CustomerProfile";

import RestaurantDashboard from "../pages/restaurant/RestaurantDashboard";
import RestaurantProfile from "../pages/restaurant/RestaurantProfile";
import ApprovalStatus from "../pages/restaurant/ApprovalStatus";
import MenuManagement from "../pages/restaurant/MenuManagement";
import RestaurantOrders from "../pages/restaurant/RestaurantOrders";

import DeliveryDashboard from "../pages/delivery/DeliveryDashboard";
import DeliveryProfile from "../pages/delivery/DeliveryProfile";
import DeliveryApprovalStatus from "../pages/delivery/DeliveryApprovalStatus";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProfile from "../pages/admin/AdminProfile";
import RestaurantApprovals from "../pages/admin/RestaurantApprovals";
import DeliveryApprovals from "../pages/admin/DeliveryApprovals";

import RestaurantDetails from "../pages/customer/RestaurantDetails";
import Cart from "../pages/customer/Cart";

import Checkout from "../pages/customer/Checkout";
import MyOrders from "../pages/customer/MyOrders";

import OrderDetails from "../pages/customer/OrderDetails";
import DeliveryOrders from "../pages/delivery/DeliveryOrders";

import DeliveredOrders from "../pages/delivery/DeliveredOrders";
import DeliveryAddress from "../pages/customer/DeliveryAddress";

import WriteReview from "../pages/customer/WriteReview";
import DeliveryTracking from "../pages/delivery/DeliveryTracking";
import LiveTracking from "../pages/customer/LiveTracking";




function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Customer */}
      <Route
        path="/customer/dashboard"
        element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/profile"
        element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <CustomerProfile />
          </ProtectedRoute>
        }
      />

      {/* Restaurant Owner */}
      <Route
        path="/restaurant/dashboard"
        element={
          <ProtectedRoute allowedRoles={["RESTAURANT_OWNER"]}>
            <RestaurantDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/restaurant/profile"
        element={
          <ProtectedRoute allowedRoles={["RESTAURANT_OWNER"]}>
            <RestaurantProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/restaurant/approval-status"
        element={
          <ProtectedRoute allowedRoles={["RESTAURANT_OWNER"]}>
            <ApprovalStatus />
          </ProtectedRoute>
        }
      />

      <Route
        path="/restaurant/menu"
        element={
          <ProtectedRoute allowedRoles={["RESTAURANT_OWNER"]} requireApproval>
            <MenuManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/restaurant/orders"
        element={
          <ProtectedRoute allowedRoles={["RESTAURANT_OWNER"]} requireApproval>
            <RestaurantOrders />
          </ProtectedRoute>
        }
      />

      {/* Delivery Partner */}
      <Route
        path="/delivery/dashboard"
        element={
          <ProtectedRoute allowedRoles={["DELIVERY_PARTNER"]}>
            <DeliveryDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/delivery/profile"
        element={
          <ProtectedRoute allowedRoles={["DELIVERY_PARTNER"]}>
            <DeliveryProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/delivery/approval-status"
        element={
          <ProtectedRoute allowedRoles={["DELIVERY_PARTNER"]}>
            <DeliveryApprovalStatus />
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/restaurant-approvals"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <RestaurantApprovals />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/delivery-approvals"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <DeliveryApprovals />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/restaurants/:restaurantId"
        element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <RestaurantDetails />
          </ProtectedRoute>
        }
      />

        <Route
  path="/customer/cart"
  element={
    <ProtectedRoute allowedRoles={["CUSTOMER"]}>
      <Cart />
    </ProtectedRoute>
  }
/>

  <Route
  path="/customer/checkout"
  element={
    <ProtectedRoute allowedRoles={["CUSTOMER"]}>
      <Checkout />
    </ProtectedRoute>
  }
/>

  <Route
  path="/customer/orders"
  element={
    <ProtectedRoute allowedRoles={["CUSTOMER"]}>
      <MyOrders />
    </ProtectedRoute>
  }
  />

    <Route
    path="/customer/orders/:orderId"
    element={
      <ProtectedRoute allowedRoles={["CUSTOMER"]}>
        <OrderDetails />
      </ProtectedRoute>
    }
  />

  <Route
  path="/delivery/orders"
  element={
    <ProtectedRoute allowedRoles={["DELIVERY_PARTNER"]} requireApproval>
      <DeliveryOrders />
    </ProtectedRoute>
  }
  />

  <Route
  path="/delivery/delivered-orders"
  element={
    <ProtectedRoute allowedRoles={["DELIVERY_PARTNER"]} requireApproval>
      <DeliveredOrders/>
    </ProtectedRoute>
  }
  />

    <Route
    path="/customer/delivery-address"
    element={
      <ProtectedRoute allowedRoles={["CUSTOMER"]}>
        <DeliveryAddress />
      </ProtectedRoute>
    }
  />

  <Route
  path="/customer/home"
  element={
    <ProtectedRoute allowedRoles={["CUSTOMER"]}>
      <CustomerHome />
    </ProtectedRoute>
  }
/>

    <Route
    path="/customer/review/:orderId"
    element={
      <ProtectedRoute allowedRoles={["CUSTOMER"]}>
        <WriteReview />
      </ProtectedRoute>
    }
  />

    <Route
    path="/delivery/tracking/:orderId"
    element={
      <ProtectedRoute allowedRoles={["DELIVERY_PARTNER"]} requireApproval>
        <DeliveryTracking />
      </ProtectedRoute>
    }
  />

  <Route
  path="/customer/tracking/:orderId"
  element={
    <ProtectedRoute allowedRoles={["CUSTOMER"]}>
      <LiveTracking />
    </ProtectedRoute>
  }
/>




    </Routes>
  );
}

export default AppRoutes;