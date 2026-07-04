import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getDeliveryOrders,
  acceptDeliveryOrder,
  pickupDeliveryOrder,
  markDeliveryOrderDelivered,
} from "../../features/delivery/services/deliveryOrderService";

function DeliveryOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchOrders() {
    try {
      setLoading(true);
      setError("");

      const response = await getDeliveryOrders();
      const apiOrders = response.data || [];

      const activeOrder = JSON.parse(
        localStorage.getItem("activeDeliveryOrder")
      );

      const mergedOrders =
        activeOrder &&
        !apiOrders.some((order) => order._id === activeOrder._id)
          ? [activeOrder, ...apiOrders]
          : apiOrders;

      setOrders(mergedOrders);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  async function handleAccept(orderId) {
    try {
      const response = await acceptDeliveryOrder(orderId);
      const acceptedOrder = orders.find((order) => order._id === orderId);

      const updatedOrder = {
        ...acceptedOrder,
        orderStatus: "OUT_FOR_DELIVERY",
        deliveryPartnerId: response.data?.deliveryPartnerId,
      };

      localStorage.setItem("activeDeliveryOrder", JSON.stringify(updatedOrder));

      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? updatedOrder : order))
      );

      alert("Delivery order accepted");
    } catch (error) {
      alert(error.message);
    }
  }

  async function handlePickup(orderId) {
    try {
      await pickupDeliveryOrder(orderId);

      const updatedOrders = orders.map((order) =>
        order._id === orderId
          ? {
              ...order,
              orderStatus: "OUT_FOR_DELIVERY",
              pickedUpAt: new Date().toISOString(),
            }
          : order
      );

      setOrders(updatedOrders);

      const activeOrder = updatedOrders.find((order) => order._id === orderId);
      localStorage.setItem("activeDeliveryOrder", JSON.stringify(activeOrder));

      alert("Order picked up");
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleDelivered(orderId) {
    try {
      await markDeliveryOrderDelivered(orderId);

      localStorage.removeItem("activeDeliveryOrder");

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, orderStatus: "DELIVERED" }
            : order
        )
      );

      alert("Order delivered successfully");
      fetchOrders();
    } catch (error) {
      alert(error.message);
    }
  }

  function getStatusStyle(status) {
    if (status === "READY_FOR_PICKUP") return "bg-purple-100 text-purple-700";
    if (status === "OUT_FOR_DELIVERY") return "bg-indigo-100 text-indigo-700";
    if (status === "DELIVERED") return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-700";
  }

  function getDeliveryStep(order) {
    if (order.orderStatus === "READY_FOR_PICKUP") return "READY";

    if (order.orderStatus === "OUT_FOR_DELIVERY" && !order.pickedUpAt) {
      return "ACCEPTED";
    }

    if (order.orderStatus === "OUT_FOR_DELIVERY" && order.pickedUpAt) {
      return "ON_WAY";
    }

    if (order.orderStatus === "DELIVERED") return "DELIVERED";

    return "UNKNOWN";
  }

  const filteredOrders = orders.filter((order) => {
    const search = searchText.toLowerCase();

    const customerName = order.customerId?.fullName || "";
    const restaurantName = order.restaurantId?.restaurantName || "";
    const orderId = order._id || "";

    return (
      customerName.toLowerCase().includes(search) ||
      restaurantName.toLowerCase().includes(search) ||
      orderId.toLowerCase().includes(search)
    );
  });

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Delivery Orders</h1>
        <p className="text-sm text-gray-500">
          Accept, pickup, track, and complete delivery orders.
        </p>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
        <input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search by customer, restaurant, or order ID..."
          className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {loading && (
        <p className="rounded-xl bg-white p-4 text-gray-500">
          Loading delivery orders...
        </p>
      )}

      {error && (
        <p className="rounded-xl bg-red-50 p-4 text-red-500">{error}</p>
      )}

      {!loading && filteredOrders.length === 0 && (
        <p className="rounded-xl bg-white p-4 text-gray-500">
          No delivery orders found.
        </p>
      )}

      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const status = order.orderStatus;
          const orderId = order._id;
          const deliveryStep = getDeliveryStep(order);

          return (
            <div key={orderId} className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Order #{orderId}
                  </h2>

                  <p className="text-sm text-gray-500">
                    Customer: {order.customerId?.fullName || "N/A"}
                  </p>

                  <p className="text-sm text-gray-500">
                    Phone: {order.customerId?.phoneNumber || "N/A"}
                  </p>

                  <p className="text-sm text-gray-500">
                    Restaurant: {order.restaurantId?.restaurantName || "N/A"}
                  </p>

                  {order.createdAt && (
                    <p className="text-sm text-gray-400">
                      Ordered At: {new Date(order.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-xs font-bold ${getStatusStyle(
                    status
                  )}`}
                >
                  {status}
                </span>
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-700">Items</p>

                <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                  {order.items?.map((item, index) => (
                    <li key={index}>
                      {item.menuItemId?.name || "Item"} x {item.quantity} — ₹
                      {item.price}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 rounded-2xl bg-gray-50 p-4">
                <p className="mb-3 text-sm font-semibold text-gray-700">
                  Delivery Progress
                </p>

                <div className="flex flex-wrap gap-3 text-xs font-semibold">
                  <StepBadge
                    active={["READY", "ACCEPTED", "ON_WAY", "DELIVERED"].includes(
                      deliveryStep
                    )}
                  >
                    Ready For Pickup
                  </StepBadge>

                  <StepBadge
                    active={["ACCEPTED", "ON_WAY", "DELIVERED"].includes(
                      deliveryStep
                    )}
                  >
                    Accepted
                  </StepBadge>

                  <StepBadge
                    active={["ON_WAY", "DELIVERED"].includes(deliveryStep)}
                  >
                    On Way
                  </StepBadge>

                  <StepBadge active={deliveryStep === "DELIVERED"}>
                    Delivered
                  </StepBadge>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <p className="font-bold text-gray-800">
                  Total: ₹{order.totalAmount}
                </p>

                <div className="flex flex-wrap gap-3">
                  {status === "READY_FOR_PICKUP" && (
                    <button
                      type="button"
                      onClick={() => handleAccept(orderId)}
                      className="rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Accept Delivery
                    </button>
                  )}

                  {status === "OUT_FOR_DELIVERY" && (
                    <button
                      type="button"
                      onClick={() => navigate(`/delivery/tracking/${orderId}`)}
                      className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Track Delivery
                    </button>
                  )}

                  {status === "OUT_FOR_DELIVERY" && !order.pickedUpAt && (
                    <button
                      type="button"
                      onClick={() => handlePickup(orderId)}
                      className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Pickup Order
                    </button>
                  )}

                  {status === "OUT_FOR_DELIVERY" && order.pickedUpAt && (
                    <>
                      <span className="rounded-xl bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
                        On Way
                      </span>

                      <button
                        type="button"
                        onClick={() => handleDelivered(orderId)}
                        className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Delivered
                      </button>
                    </>
                  )}

                  {status === "DELIVERED" && (
                    <span className="rounded-xl bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                      Delivered Order
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}

function StepBadge({ active, children }) {
  return (
    <span
      className={`rounded-full px-3 py-1 ${
        active ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"
      }`}
    >
      {children}
    </span>
  );
}

export default DeliveryOrders;