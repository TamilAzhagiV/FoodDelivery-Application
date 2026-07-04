import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getDeliveryOrders } from "../../features/delivery/services/deliveryOrderService";
import { getDeliveryReviews } from "../../features/review/services/reviewService";

function DeliveryDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalOrders: 0,
    readyForPickup: 0,
    outForDelivery: 0,
    delivered: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchDashboardData() {
    try {
      setLoading(true);
      setError("");

      const orderResponse = await getDeliveryOrders();
      const reviewResponse = await getDeliveryReviews();

      const orders = orderResponse.data || [];
      const reviewData = reviewResponse.data || reviewResponse.reviews || [];

      setStats({
        totalOrders: orders.length,
        readyForPickup: orders.filter(
          (order) => order.orderStatus === "READY_FOR_PICKUP"
        ).length,
        outForDelivery: orders.filter(
          (order) => order.orderStatus === "OUT_FOR_DELIVERY"
        ).length,
        delivered: orders.filter((order) => order.orderStatus === "DELIVERED")
          .length,
      });

      setRecentOrders(orders.slice(0, 5));
      setReviews(reviewData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);

  function getStatusStyle(status) {
    if (status === "READY_FOR_PICKUP") return "bg-purple-100 text-purple-700";
    if (status === "OUT_FOR_DELIVERY") return "bg-indigo-100 text-indigo-700";
    if (status === "DELIVERED") return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-700";
  }

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, review) =>
              sum + (review.ratings?.overallExperience || 0),
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  const recentReviews = reviews.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Delivery Partner Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Track delivery orders, ratings, and delivery progress.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/delivery/orders")}
          className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
        >
          View Delivery Orders
        </button>
      </div>

      {loading && (
        <p className="rounded-xl bg-white p-4 text-gray-500">
          Loading delivery dashboard...
        </p>
      )}

      {error && (
        <p className="rounded-xl bg-red-50 p-4 text-red-500">{error}</p>
      )}

      {!loading && !error && (
        <>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <DashboardCard
              title="Total Orders"
              value={stats.totalOrders}
              description="All visible delivery orders"
            />

            <DashboardCard
              title="Ready For Pickup"
              value={stats.readyForPickup}
              description="Orders waiting for delivery"
              color="purple"
            />

            <DashboardCard
              title="Out For Delivery"
              value={stats.outForDelivery}
              description="Accepted or picked orders"
              color="indigo"
            />

            <DashboardCard
              title="Delivered"
              value={stats.delivered}
              description="Completed deliveries"
              color="green"
            />
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <DashboardCard
              title="Average Rating"
              value={`⭐ ${averageRating}`}
              description="Based on customer delivery reviews"
              color="green"
            />

            <DashboardCard
              title="Total Reviews"
              value={reviews.length}
              description="Reviews received from customers"
              color="orange"
            />
          </div>

          <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                Recent Delivery Orders
              </h2>

              <button
                type="button"
                onClick={() => navigate("/delivery/orders")}
                className="text-sm font-semibold text-orange-500"
              >
                View All
              </button>
            </div>

            {recentOrders.length === 0 && (
              <p className="rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
                No delivery orders found.
              </p>
            )}

            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 p-4"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Order #{order._id}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Customer: {order.customerId?.fullName || "N/A"}
                    </p>

                    <p className="text-sm text-gray-500">
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
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-gray-800">
              Recent Delivery Reviews
            </h2>

            {recentReviews.length === 0 ? (
              <p className="rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
                No delivery reviews found.
              </p>
            ) : (
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div
                    key={review._id}
                    className="rounded-2xl border border-gray-100 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-semibold text-gray-800">
                        Overall: ⭐ {review.ratings?.overallExperience || 0}/5
                      </p>

                      <span className="text-xs text-gray-400">
                        {review.createdAt
                          ? new Date(review.createdAt).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>

                    <div className="mt-3 grid gap-2 text-sm text-gray-600 md:grid-cols-2">
                      <p>Delivery Time: ⭐ {review.ratings?.deliveryTime || 0}</p>
                      <p>Behaviour: ⭐ {review.ratings?.behaviour || 0}</p>
                      <p>
                        Professionalism: ⭐{" "}
                        {review.ratings?.professionalism || 0}
                      </p>
                      <p>
                        Communication: ⭐ {review.ratings?.communication || 0}
                      </p>
                    </div>

                    <p className="mt-3 text-gray-600">
                      {review.review || "No written review."}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                      Order #{review.orderId}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

function DashboardCard({ title, value, description, color = "orange" }) {
  const colors = {
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
    indigo: "bg-indigo-100 text-indigo-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>

      <div
        className={`mt-4 inline-flex rounded-2xl px-5 py-3 text-3xl font-bold ${colors[color]}`}
      >
        {value}
      </div>

      <p className="mt-3 text-sm text-gray-400">{description}</p>
    </div>
  );
}

export default DeliveryDashboard;