import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomerLayout from "../../components/layout/CustomerLayout";
import { getOrders } from "../../features/customer/services/orderService";

import {
  getRestaurantReviews,
  getDeliveryReviews,
} from "../../features/review/services/reviewService";

function CustomerDashboard() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [restaurantReviews, setRestaurantReviews] = useState([]);
  const [deliveryReviews, setDeliveryReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  async function fetchDashboard() {
    try {
      const [
        orderResponse,
        restaurantReviewResponse,
        deliveryReviewResponse,
      ] = await Promise.all([
        getOrders(),
        getRestaurantReviews(),
        getDeliveryReviews(),
      ]);

      setOrders(orderResponse.data || []);

      setRestaurantReviews(
        restaurantReviewResponse.data ||
          restaurantReviewResponse.reviews ||
          []
      );

      setDeliveryReviews(
        deliveryReviewResponse.data ||
          deliveryReviewResponse.reviews ||
          []
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  const activeOrders = orders.filter((order) =>
    [
      "PLACED",
      "ACCEPTED",
      "PREPARING",
      "READY_FOR_PICKUP",
      "OUT_FOR_DELIVERY",
    ].includes(order.orderStatus)
  );

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "DELIVERED"
  );

  const cancelledOrders = orders.filter(
    (order) => order.orderStatus === "CANCELLED"
  );

  const recentOrders = orders.slice(0, 5);

  const averageRestaurantRating =
    restaurantReviews.length > 0
      ? (
          restaurantReviews.reduce(
            (sum, review) => sum + (review.rating || 0),
            0
          ) / restaurantReviews.length
        ).toFixed(1)
      : "0.0";

  const averageDeliveryRating =
    deliveryReviews.length > 0
      ? (
          deliveryReviews.reduce(
            (sum, review) =>
              sum + (review.ratings?.overallExperience || 0),
            0
          ) / deliveryReviews.length
        ).toFixed(1)
      : "0.0";

  const recentRestaurantReviews = restaurantReviews.slice(0, 3);
  const recentDeliveryReviews = deliveryReviews.slice(0, 3);

  return (
    <CustomerLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Customer Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          Track your orders, reviews and activity.
        </p>
      </div>

      {loading && (
        <p className="rounded-xl bg-white p-4 text-gray-500">
          Loading dashboard...
        </p>
      )}

      {!loading && (
        <>
          {/* Order Summary */}

          <div className="mb-8 grid gap-5 md:grid-cols-4">
            <StatCard title="Total Orders" value={orders.length} />
            <StatCard title="Active Orders" value={activeOrders.length} />
            <StatCard title="Delivered" value={deliveredOrders.length} />
            <StatCard title="Cancelled" value={cancelledOrders.length} />
          </div>

          {/* Review Summary */}

          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Review Summary
          </h2>

          <div className="mb-8 grid gap-5 md:grid-cols-4">
            <StatCard
              title="Restaurant Reviews"
              value={restaurantReviews.length}
            />

            <StatCard
              title="Delivery Reviews"
              value={deliveryReviews.length}
            />

            <StatCard
              title="Restaurant Rating"
              value={`⭐ ${averageRestaurantRating}`}
            />

            <StatCard
              title="Delivery Rating"
              value={`⭐ ${averageDeliveryRating}`}
            />
          </div>

          {/* Recent Orders */}

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-gray-800">
              Recent Orders
            </h2>

            {recentOrders.length === 0 ? (
              <p className="text-gray-500">
                No orders found.
              </p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order._id}
                    className="flex items-center justify-between rounded-2xl border p-4"
                  >
                    <div>
                      <p className="font-bold">
                        Order #{order._id}
                      </p>

                      <p className="text-sm text-gray-500">
                        {order.restaurantId?.restaurantName}
                      </p>
                    </div>

                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
                      {order.orderStatus}
                    </span>

                    <button
                      onClick={() =>
                        navigate(`/customer/orders/${order._id}`)
                      }
                      className="rounded-xl border px-4 py-2"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Restaurant Reviews */}

          <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold">
              Recent Restaurant Reviews
            </h2>

            {recentRestaurantReviews.length === 0 ? (
              <p>No restaurant reviews yet.</p>
            ) : (
              recentRestaurantReviews.map((review) => (
                <div
                  key={review._id}
                  className="mb-4 rounded-2xl border p-4"
                >
                  <p className="font-semibold">
                    ⭐ {review.rating}/5
                  </p>

                  <p className="mt-2 text-gray-600">
                    {review.review}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Recent Delivery Reviews */}

          <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold">
              Recent Delivery Reviews
            </h2>

            {recentDeliveryReviews.length === 0 ? (
              <p>No delivery reviews yet.</p>
            ) : (
              recentDeliveryReviews.map((review) => (
                <div
                  key={review._id}
                  className="mb-4 rounded-2xl border p-4"
                >
                  <p className="font-semibold">
                    ⭐ {review.ratings?.overallExperience}/5
                  </p>

                  <p className="mt-2 text-gray-600">
                    {review.review}
                  </p>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </CustomerLayout>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>

      <p className="mt-3 text-3xl font-bold text-orange-500">
        {value}
      </p>
    </div>
  );
}

export default CustomerDashboard;