import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CustomerLayout from "../../components/layout/CustomerLayout";
import { getOrderById } from "../../features/customer/services/orderService";

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchOrderDetails() {
    try {
      setLoading(true);
      setError("");

      const response = await getOrderById(orderId);
      setOrder(response.data || null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

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
        <h1 className="text-3xl font-bold text-gray-800">Order Details</h1>
        <p className="text-sm text-gray-500">
          View full details of your order.
        </p>
      </div>

      {loading && (
        <p className="rounded-xl bg-white p-4 text-gray-500">
          Loading order details...
        </p>
      )}

      {error && (
        <p className="rounded-xl bg-red-50 p-4 text-red-500">{error}</p>
      )}

      {!loading && !order && (
        <p className="rounded-xl bg-white p-4 text-gray-500">
          Order not found.
        </p>
      )}

      {order && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Order #{order._id}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Restaurant: {order.restaurantId?.restaurantName || "N/A"}
                </p>
              </div>

              <span
                className={`rounded-full px-4 py-2 text-xs font-bold ${getStatusStyle(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {["READY_FOR_PICKUP", "OUT_FOR_DELIVERY"].includes(
                order.orderStatus
              ) && (
                <button
                  type="button"
                  onClick={() => navigate(`/customer/tracking/${order._id}`)}
                  className="rounded-xl bg-indigo-500 px-5 py-2 text-sm font-semibold text-white"
                >
                  Track Order
                </button>
              )}

              {order.orderStatus === "DELIVERED" && (
                <button
                  type="button"
                  onClick={() => navigate(`/customer/review/${order._id}`)}
                  className="rounded-xl bg-orange-500 px-5 py-2 text-sm font-semibold text-white"
                >
                  Write Review
                </button>
              )}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Ordered Items
            </h2>

            <div className="space-y-4">
              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-3 last:border-b-0"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.menuItemId?.name || "Item"}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold text-gray-700">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-between text-lg font-bold text-gray-800">
              <span>Total Amount</span>
              <span>₹{order.totalAmount}</span>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Order Timeline
            </h2>

            <div className="space-y-3 text-sm text-gray-600">
              <TimelineItem
                label="Order Placed"
                active={[
                  "PLACED",
                  "ACCEPTED",
                  "PREPARING",
                  "READY_FOR_PICKUP",
                  "OUT_FOR_DELIVERY",
                  "DELIVERED",
                ].includes(order.orderStatus)}
              />

              <TimelineItem
                label="Restaurant Accepted"
                active={[
                  "ACCEPTED",
                  "PREPARING",
                  "READY_FOR_PICKUP",
                  "OUT_FOR_DELIVERY",
                  "DELIVERED",
                ].includes(order.orderStatus)}
              />

              <TimelineItem
                label="Preparing"
                active={[
                  "PREPARING",
                  "READY_FOR_PICKUP",
                  "OUT_FOR_DELIVERY",
                  "DELIVERED",
                ].includes(order.orderStatus)}
              />

              <TimelineItem
                label="Ready For Pickup"
                active={[
                  "READY_FOR_PICKUP",
                  "OUT_FOR_DELIVERY",
                  "DELIVERED",
                ].includes(order.orderStatus)}
              />

              <TimelineItem
                label="Delivery Accepted"
                active={["OUT_FOR_DELIVERY", "DELIVERED"].includes(
                  order.orderStatus
                )}
              />

              <TimelineItem
                label="Out For Delivery"
                active={["OUT_FOR_DELIVERY", "DELIVERED"].includes(
                  order.orderStatus
                )}
              />

              <TimelineItem
                label="Delivered"
                active={order.orderStatus === "DELIVERED"}
              />
            </div>
          </div>
        </div>
      )}
    </CustomerLayout>
  );
}

function TimelineItem({ label, active }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`h-3 w-3 rounded-full ${
          active ? "bg-orange-500" : "bg-gray-300"
        }`}
      />
      <span className={active ? "font-semibold text-gray-800" : ""}>
        {label}
      </span>
    </div>
  );
}

export default OrderDetails;