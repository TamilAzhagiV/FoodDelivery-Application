import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getAllRestaurantsForApproval,
  approveRestaurant,
  rejectRestaurant,
} from "../../features/admin/services/adminRestaurantService";

function RestaurantApprovals() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  async function fetchRestaurants() {
    try {
      setLoading(true);
      setError("");

      const response = await getAllRestaurantsForApproval();
      const data = response.data || [];

      const ordered = [...data].sort((a, b) => {
        const order = {
          PENDING: 1,
          APPROVED: 2,
          REJECTED: 3,
        };

        return order[a.approvalStatus] - order[b.approvalStatus];
      });

      setRestaurants(ordered);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  async function loadRestaurants() {
    await fetchRestaurants();
  }

  loadRestaurants();
}, []);

  async function handleApprove(restaurantId) {
    const confirmApprove = window.confirm(
      "Are you sure you want to approve this restaurant?"
    );

    if (!confirmApprove) return;

    try {
      await approveRestaurant(restaurantId);
      alert("Restaurant approved successfully");
      fetchRestaurants();
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleReject() {
    if (!rejectReason.trim()) {
      alert("Rejection reason is required");
      return;
    }

    try {
      await rejectRestaurant(rejectingId, rejectReason);
      alert("Restaurant rejected successfully");

      setRejectingId(null);
      setRejectReason("");

      fetchRestaurants();
    } catch (error) {
      alert(error.message);
    }
  }

  function getStatusClass(status) {
    if (status === "APPROVED") {
      return "bg-green-100 text-green-600";
    }

    if (status === "REJECTED") {
      return "bg-red-100 text-red-600";
    }

    return "bg-yellow-100 text-yellow-600";
  }

  const filteredRestaurants = restaurants.filter((restaurant) => {
  const matchesName = restaurant.restaurantName
    ?.toLowerCase()
    .includes(searchText.toLowerCase());

  const matchesStatus =
    statusFilter === "ALL" || restaurant.approvalStatus === statusFilter;

  return matchesName && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Restaurant Approvals
        </h1>

        <p className="text-sm text-gray-500">
          Review pending, approved, and rejected restaurants.
        </p>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
  <div className="grid gap-4 md:grid-cols-2">
    <input
      type="text"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      placeholder="Search by restaurant name..."
      className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
    />

    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
    >
      <option value="ALL">All Status</option>
      <option value="PENDING">Pending</option>
      <option value="APPROVED">Approved</option>
      <option value="REJECTED">Rejected</option>
    </select>
  </div>
  </div>

      {loading && (
        <p className="rounded-xl bg-white p-4 text-gray-500">
          Loading restaurants...
        </p>
      )}

      {error && (
        <p className="rounded-xl bg-red-50 p-4 text-red-500">
          {error}
        </p>
      )}

      {!loading && filteredRestaurants.length === 0 && (
        <p className="rounded-xl bg-white p-4 text-gray-500">
          No restaurants found.
        </p>
      )}

      <div className="space-y-4">
  {filteredRestaurants.map((restaurant) => (
    <div
      key={restaurant._id}
      className="flex items-center justify-between rounded-2xl bg-white px-6 py-5 shadow-sm"
    >
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-orange-100 text-xl font-bold text-orange-500">
          {restaurant.logo ? (
            <img
              src={`http://192.168.1.22:3000/uploads/${restaurant.logo}`}
              alt={restaurant.restaurantName}
              className="h-full w-full object-cover"
            />
          ) : (
            restaurant.restaurantName?.charAt(0) || "R"
          )}
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-700">
            {restaurant.restaurantName}
          </h2>
          <p className="text-xs text-gray-500">
            {restaurant.businessEmail}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`rounded-full px-5 py-2 text-xs font-bold ${
            restaurant.approvalStatus === "APPROVED"
              ? "bg-green-100 text-green-600"
              : restaurant.approvalStatus === "REJECTED"
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {restaurant.approvalStatus}
        </span>

        <button
          type="button"
          onClick={() => setSelectedRestaurant(restaurant)}
          className="rounded-xl border border-gray-800 px-6 py-2 text-sm font-semibold hover:bg-gray-100"
        >
          View
        </button>

        {restaurant.approvalStatus === "PENDING" && (
          <>
            <button
              type="button"
              onClick={() => handleApprove(restaurant._id)}
              className="rounded-xl bg-green-500 px-5 py-2 text-sm font-semibold text-white hover:bg-green-600"
            >
              Approve
            </button>

            <button
              type="button"
              onClick={() => setRejectingId(restaurant._id)}
              className="rounded-xl bg-red-500 px-5 py-2 text-sm font-semibold text-white hover:bg-red-600"
            >
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  ))}
  </div>
      {selectedRestaurant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedRestaurant.restaurantName}
              </h2>

              <button
                type="button"
                onClick={() => setSelectedRestaurant(null)}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-600"
              >
                X
              </button>
            </div>

            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-2xl font-bold text-orange-500">
                {selectedRestaurant.restaurantName?.charAt(0) || "R"}
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Approval Status
                </p>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                    selectedRestaurant.approvalStatus
                  )}`}
                >
                  {selectedRestaurant.approvalStatus}
                </span>
              </div>
            </div>

            <div className="grid gap-4 text-sm text-gray-700 md:grid-cols-2">
              <p>
                <b>Description:</b> {selectedRestaurant.description || "N/A"}
              </p>

              <p>
                <b>Business Email:</b>{" "}
                {selectedRestaurant.businessEmail || "N/A"}
              </p>

              <p>
                <b>Business Phone:</b>{" "}
                {selectedRestaurant.businessPhoneNumber || "N/A"}
              </p>

              <p>
                <b>GST:</b> {selectedRestaurant.gstNumber || "N/A"}
              </p>

              <p>
                <b>FSSAI:</b>{" "}
                {selectedRestaurant.fssaiLicenseNumber || "N/A"}
              </p>

              <p>
                <b>Owner Name:</b>{" "}
                {selectedRestaurant.ownerId?.fullName || "N/A"}
              </p>

              <p>
                <b>Owner Email:</b>{" "}
                {selectedRestaurant.ownerId?.email || "N/A"}
              </p>

              <p>
                <b>Owner Phone:</b>{" "}
                {selectedRestaurant.ownerId?.phoneNumber || "N/A"}
              </p>

              <p className="md:col-span-2">
                <b>Address:</b>{" "}
                {selectedRestaurant.address?.street || ""},{" "}
                {selectedRestaurant.address?.area || ""},{" "}
                {selectedRestaurant.address?.city || ""},{" "}
                {selectedRestaurant.address?.state || ""} -{" "}
                {selectedRestaurant.address?.pincode || ""}
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              {selectedRestaurant.approvalStatus === "PENDING" && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      handleApprove(selectedRestaurant._id);
                      setSelectedRestaurant(null);
                    }}
                    className="rounded-xl bg-green-500 px-5 py-2 text-sm font-semibold text-white hover:bg-green-600"
                  >
                    Approve
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRejectingId(selectedRestaurant._id);
                      setSelectedRestaurant(null);
                    }}
                    className="rounded-xl bg-red-500 px-5 py-2 text-sm font-semibold text-white hover:bg-red-600"
                  >
                    Reject
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => setSelectedRestaurant(null)}
                className="rounded-xl bg-gray-800 px-5 py-2 text-sm font-semibold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {rejectingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Reject Restaurant
            </h2>

            <textarea
              value={rejectReason}
              onChange={(event) => setRejectReason(event.target.value)}
              placeholder="Enter rejection reason"
              className="w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
              rows="4"
            />

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setRejectingId(null);
                  setRejectReason("");
                }}
                className="rounded-xl border px-4 py-2 text-sm font-semibold"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleReject}
                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
              >
                Submit Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default RestaurantApprovals;