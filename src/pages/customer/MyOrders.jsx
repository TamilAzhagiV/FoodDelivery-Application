import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomerLayout from "../../components/layout/CustomerLayout";

import {
  getOrders,
  cancelOrder,
} from "../../features/customer/services/orderService";

function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchOrders() {
    try {
      setLoading(true);
      setError("");

      const response = await getOrders();
      setOrders(response.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  async function handleCancel(orderId) {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");

    if (!confirmCancel) return;

    try {
      await cancelOrder(orderId);
      alert("Order cancelled successfully");
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

  return (
    <CustomerLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
        <p className="text-sm text-gray-500">
          Track and manage your food orders.
        </p>
      </div>

      {loading && (
        <p className="rounded-xl bg-white p-4 text-gray-500">
          Loading orders...
        </p>
      )}

      {error && (
        <p className="rounded-xl bg-red-50 p-4 text-red-500">{error}</p>
      )}

      {!loading && orders.length === 0 && (
        <p className="rounded-xl bg-white p-4 text-gray-500">
          No orders found.
        </p>
      )}

      <div className="space-y-4">
        {orders.map((order) => {
          const restaurantName =
            order.restaurantId?.restaurantName || "Restaurant";

          return (
            <div key={order._id} className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-bold text-gray-800">
                    Order #{order._id}
                  </h2>

                  <p className="text-sm text-gray-500">
                    Restaurant: {restaurantName}
                  </p>

                  {order.createdAt && (
                    <p className="text-sm text-gray-400">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-xs font-bold ${getStatusStyle(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-700">Items</p>

                <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                  {order.items?.map((item) => (
                    <li key={item._id || item.menuItemId?._id}>
                      {item.menuItemId?.name || "Item"} x {item.quantity} — ₹
                      {item.price}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <p className="font-bold text-gray-800">
                  Total: ₹{order.totalAmount}
                </p>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(`/customer/orders/${order._id}`)}
                    className="rounded-xl border px-4 py-2 text-sm font-semibold"
                  >
                    View Details
                  </button>

                  {order.orderStatus === "PLACED" && (
                    <button
                      type="button"
                      onClick={() => handleCancel(order._id)}
                      className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </CustomerLayout>
  );
}

export default MyOrders;