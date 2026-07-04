import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getAllRestaurantsForApproval,
  getAllDeliveryPartnersForApproval,
} from "../../features/admin/services/adminRestaurantService";

function AdminDashboard() {
  const [restaurantStats, setRestaurantStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const [deliveryStats, setDeliveryStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function calculateStats(data) {
    return {
      total: data.length,
      pending: data.filter((item) => item.approvalStatus === "PENDING").length,
      approved: data.filter((item) => item.approvalStatus === "APPROVED").length,
      rejected: data.filter((item) => item.approvalStatus === "REJECTED").length,
    };
  }

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);

        const restaurantResponse = await getAllRestaurantsForApproval();
        const deliveryResponse = await getAllDeliveryPartnersForApproval();

        const restaurants = restaurantResponse.data || [];
        const deliveryPartners = deliveryResponse.data || [];

        setRestaurantStats(calculateStats(restaurants));
        setDeliveryStats(calculateStats(deliveryPartners));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Monitor restaurant and delivery partner approval status.
        </p>
      </div>

      {loading && (
        <p className="rounded-xl bg-white p-4 text-gray-500">
          Loading dashboard analytics...
        </p>
      )}

      {error && (
        <p className="rounded-xl bg-red-50 p-4 text-red-500">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Restaurant Analytics
          </h2>

          <div className="mb-8 grid gap-5 md:grid-cols-4">
            <StatCard title="Total Restaurants" value={restaurantStats.total} />
            <StatCard title="Pending" value={restaurantStats.pending} color="yellow" />
            <StatCard title="Approved" value={restaurantStats.approved} color="green" />
            <StatCard title="Rejected" value={restaurantStats.rejected} color="red" />
          </div>

          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Delivery Partner Analytics
          </h2>

          <div className="grid gap-5 md:grid-cols-4">
            <StatCard title="Total Partners" value={deliveryStats.total} />
            <StatCard title="Pending" value={deliveryStats.pending} color="yellow" />
            <StatCard title="Approved" value={deliveryStats.approved} color="green" />
            <StatCard title="Rejected" value={deliveryStats.rejected} color="red" />
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

function StatCard({ title, value, color = "orange" }) {
  const colors = {
    orange: "bg-orange-100 text-orange-600",
    yellow: "bg-yellow-100 text-yellow-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
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

export default AdminDashboard;