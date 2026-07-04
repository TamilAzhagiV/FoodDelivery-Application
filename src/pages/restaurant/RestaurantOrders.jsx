import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getRestaurantOrders,
  acceptRestaurantOrder,
  markOrderPreparing,
  markOrderReady,
} from "../../features/restaurant/services/restaurantOrderService";

function RestaurantOrders() {
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchOrders() {
    try {
      setLoading(true);
      setError("");

      const response = await getRestaurantOrders();
      const data = response.data || response.orders || [];

      setOrders(data);
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
      await acceptRestaurantOrder(orderId);
      alert("Order accepted successfully");
      fetchOrders();
    } catch (error) {
      alert(error.message);
    }
  }

  async function handlePreparing(orderId) {
    try {
      await markOrderPreparing(orderId);
      alert("Order marked as preparing");
      fetchOrders();
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleReady(orderId) {
    try {
      await markOrderReady(orderId);
      alert("Order marked as ready for pickup");
      fetchOrders();
    } catch (error) {
      alert(error.message);
    }
  }

  function getStatusStyle(status) {
    if (status === "PLACED") return "bg-yellow-100 text-yellow-700";
    if (status === "ACCEPTED") return "bg-green-100 text-green-700";
    if (status === "PREPARING") return "bg-blue-100 text-blue-700";
    if (status === "READY_FOR_PICKUP") return "bg-purple-100 text-purple-700";
    if (status === "OUT_FOR_DELIVERY") return "bg-indigo-100 text-indigo-700";
    if (status === "DELIVERED") return "bg-emerald-100 text-emerald-700";
    if (status === "CANCELLED") return "bg-red-100 text-red-700";

    return "bg-gray-100 text-gray-700";
  }

  const filteredOrders = orders.filter((order) => {
    const search = searchText.toLowerCase();

    const orderId = order._id || order.orderId || "";
    const customerName =
      order.customerId?.fullName ||
      order.customerName ||
      "";

    return (
      orderId.toLowerCase().includes(search) ||
      customerName.toLowerCase().includes(search)
    );
  });

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Order Management
        </h1>
        <p className="text-sm text-gray-500">
          Manage customer orders for your restaurant.
        </p>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
        <input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search by order ID or customer name..."
          className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {loading && (
        <p className="rounded-xl bg-white p-4 text-gray-500">
          Loading orders...
        </p>
      )}

      {error && (
        <p className="rounded-xl bg-red-50 p-4 text-red-500">
          {error}
        </p>
      )}

      {!loading && filteredOrders.length === 0 && (
        <p className="rounded-xl bg-white p-4 text-gray-500">
          No orders found.
        </p>
      )}

      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const orderId = order._id || order.orderId;
          const status = order.orderStatus || order.status || "PLACED";

          const customerName =
            order.customerId?.fullName ||
            order.customerName ||
            "Customer";

          const customerPhone =
            order.customerId?.phoneNumber ||
            order.customerPhone ||
            "N/A";

          const items = order.items || order.orderItems || [];

          return (
            <div
              key={orderId}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Order #{orderId}
                  </h2>

                  <p className="text-sm text-gray-500">
                    Customer: {customerName}
                  </p>

                  <p className="text-sm text-gray-500">
                    Phone: {customerPhone}
                  </p>

                  {order.createdAt && (
                    <p className="text-sm text-gray-400">
                      Ordered At:{" "}
                      {new Date(order.createdAt).toLocaleString()}
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
                <p className="text-sm font-semibold text-gray-700">
                  Items
                </p>

                <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                  {items.map((item, index) => (
                    <li key={index}>
                      {item.menuItemId?.name ||
                        item.name ||
                        item.foodName ||
                        "Item"}{" "}
                      x {item.quantity || 1} — ₹{item.price || 0}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  <p>
                    <b>Total:</b> ₹{order.totalAmount || order.total || 0}
                  </p>

                  <p>
                    <b>Payment:</b> {order.paymentStatus || "N/A"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {status === "PLACED" && (
                    <button
                      type="button"
                      onClick={() => handleAccept(orderId)}
                      className="rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Accept
                    </button>
                  )}

                  {status === "ACCEPTED" && (
                    <button
                      type="button"
                      onClick={() => handlePreparing(orderId)}
                      className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Mark Preparing
                    </button>
                  )}

                  {status === "PREPARING" && (
                    <button
                      type="button"
                      onClick={() => handleReady(orderId)}
                      className="rounded-xl bg-purple-500 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Mark Ready for Pickup
                    </button>
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

export default RestaurantOrders;