import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getMenuItems } from "../../features/restaurant/services/menuService";
import { getRestaurantOrders } from "../../features/restaurant/services/restaurantOrderService";
import { getRestaurantReviews } from "../../features/review/services/reviewService";

function RestaurantDashboard() {
  const [stats, setStats] = useState({
    totalMenuItems: 0,
    availableItems: 0,
    totalOrders: 0,
    placedOrders: 0,
    acceptedOrders: 0,
    preparingOrders: 0,
    readyOrders: 0,
  });

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function calculateStats(menuItems, orders) {
    setStats({
      totalMenuItems: menuItems.length,
      availableItems: menuItems.filter((item) => item.isAvailable).length,
      totalOrders: orders.length,
      placedOrders: orders.filter(
        (order) => (order.orderStatus || order.status) === "PLACED"
      ).length,
      acceptedOrders: orders.filter(
        (order) => (order.orderStatus || order.status) === "ACCEPTED"
      ).length,
      preparingOrders: orders.filter(
        (order) => (order.orderStatus || order.status) === "PREPARING"
      ).length,
      readyOrders: orders.filter(
        (order) => (order.orderStatus || order.status) === "READY_FOR_PICKUP"
      ).length,
    });
  }

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError("");

        const menuResponse = await getMenuItems();
        const orderResponse = await getRestaurantOrders();
        const reviewResponse = await getRestaurantReviews();

        const menuItems = menuResponse.data || menuResponse.menuItems || [];
        const orders = orderResponse.data || orderResponse.orders || [];
        const reviewData = reviewResponse.data || reviewResponse.reviews || [];

        calculateStats(menuItems, orders);
        setReviews(reviewData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  const latestReviews = reviews.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Restaurant Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          Track your menu, orders, and customer reviews.
        </p>
      </div>

      {loading && (
        <p className="rounded-xl bg-white p-4 text-gray-500">
          Loading restaurant dashboard...
        </p>
      )}

      {error && (
        <p className="rounded-xl bg-red-50 p-4 text-red-500">{error}</p>
      )}

      {!loading && !error && (
        <>
          <div className="mb-8 grid gap-5 md:grid-cols-3">
            <StatCard title="Total Menu Items" value={stats.totalMenuItems} />

            <StatCard
              title="Available Items"
              value={stats.availableItems}
              color="green"
            />

            <StatCard
              title="Total Orders"
              value={stats.totalOrders}
              color="blue"
            />
          </div>

          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Order Status
          </h2>

          <div className="grid gap-5 md:grid-cols-4">
            <StatCard
              title="Placed Orders"
              value={stats.placedOrders}
              color="yellow"
            />

            <StatCard
              title="Accepted Orders"
              value={stats.acceptedOrders}
              color="green"
            />

            <StatCard
              title="Preparing Orders"
              value={stats.preparingOrders}
              color="blue"
            />

            <StatCard
              title="Ready For Pickup"
              value={stats.readyOrders}
              color="purple"
            />
          </div>

          <div className="mt-10">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Customer Reviews
            </h2>

            <div className="mb-6 grid gap-5 md:grid-cols-2">
              <StatCard
                title="Average Rating"
                value={`⭐ ${averageRating}`}
                color="green"
              />

              <StatCard
                title="Total Reviews"
                value={reviews.length}
                color="orange"
              />
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-gray-800">
                Recent Reviews
              </h3>

              {latestReviews.length === 0 ? (
                <p className="text-gray-500">No reviews available.</p>
              ) : (
                <div className="space-y-4">
                  {latestReviews.map((review) => (
                    <div key={review._id} className="rounded-2xl border p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-800">
                          ⭐ {review.rating}/5
                        </p>

                        <span className="text-xs text-gray-400">
                          {review.createdAt
                            ? new Date(review.createdAt).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>

                      <p className="mt-2 text-gray-600">
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
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

function StatCard({ title, value, color = "orange" }) {
  const colors = {
    orange: "bg-orange-100 text-orange-600",
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>

      <div
        className={`mt-4 inline-flex rounded-2xl px-5 py-3 text-3xl font-bold ${colors[color]}`}
      >
        {value}
      </div>
    </div>
  );
}

export default RestaurantDashboard;