import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getAllDeliveryApprovals,
  approveDeliveryPartner,
  rejectDeliveryPartner,
} from "../../features/admin/services/adminDeliveryService";

function DeliveryApprovals() {
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchPartners() {
    try {
      setLoading(true);
      setError("");

      const response = await getAllDeliveryApprovals();
      const data = response.data || response.partners || [];

      const ordered = [...data].sort((a, b) => {
        const order = {
          PENDING: 1,
          APPROVED: 2,
          REJECTED: 3,
        };

        return (
          (order[a.approvalStatus] || 1) -
          (order[b.approvalStatus] || 1)
        );
      });

      setPartners(ordered);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPartners();
  }, []);

  const filteredPartners = partners.filter((partner) => {
    const search = searchText.toLowerCase();

    const name =
      partner.userId?.fullName ||
      partner.fullName ||
      "";

    const phone =
      partner.userId?.phoneNumber ||
      partner.phoneNumber ||
      "";

    const vehicleNumber = partner.vehicleNumber || "";

    const matchesSearch =
      name.toLowerCase().includes(search) ||
      phone.toLowerCase().includes(search) ||
      vehicleNumber.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "ALL" ||
      partner.approvalStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function getStatusStyle(status) {
    if (status === "APPROVED") return "bg-green-100 text-green-700";
    if (status === "REJECTED") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  }

  async function handleApprove(partnerId) {
    const confirmApprove = window.confirm(
      "Are you sure you want to approve this delivery partner?"
    );

    if (!confirmApprove) return;

    try {
      await approveDeliveryPartner(partnerId);
      alert("Delivery partner approved successfully");
      fetchPartners();
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
      await rejectDeliveryPartner(rejectingId, rejectReason);
      alert("Delivery partner rejected successfully");

      setRejectingId(null);
      setRejectReason("");

      fetchPartners();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Delivery Partner Approvals
        </h1>

        <p className="text-sm text-gray-500">
          Review pending, approved, and rejected delivery partners.
        </p>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search by name, phone, or vehicle number..."
            className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
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
          Loading delivery partners...
        </p>
      )}

      {error && (
        <p className="rounded-xl bg-red-50 p-4 text-red-500">
          {error}
        </p>
      )}

      {!loading && filteredPartners.length === 0 && (
        <p className="rounded-xl bg-white p-4 text-gray-500">
          No delivery partners found.
        </p>
      )}

      <div className="space-y-4">
        {filteredPartners.map((partner) => {
          const name =
            partner.userId?.fullName ||
            partner.fullName ||
            "Delivery Partner";

          const phone =
            partner.userId?.phoneNumber ||
            partner.phoneNumber ||
            "N/A";

          return (
            <div
              key={partner._id}
              className="flex items-center justify-between rounded-2xl bg-white px-6 py-5 shadow-sm"
            >
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-orange-100 text-xl font-bold text-orange-500">
                  {partner.profileImage ? (
                    <img
                      src={partner.profileImage}
                      alt={name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    name.charAt(0)
                  )}
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-gray-700">
                    {name}
                  </h2>

                  <p className="text-xs text-gray-500">
                    {phone}
                  </p>

                  <p className="text-xs text-gray-500">
                    {partner.vehicleType || "Vehicle"} -{" "}
                    {partner.vehicleNumber || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full px-5 py-2 text-xs font-bold ${getStatusStyle(
                    partner.approvalStatus
                  )}`}
                >
                  {partner.approvalStatus || "PENDING"}
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedPartner(partner)}
                  className="rounded-xl border border-gray-800 px-6 py-2 text-sm font-semibold hover:bg-gray-100"
                >
                  View
                </button>

                {partner.approvalStatus === "PENDING" && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleApprove(partner._id)}
                      className="rounded-xl bg-green-500 px-5 py-2 text-sm font-semibold text-white hover:bg-green-600"
                    >
                      Approve
                    </button>

                    <button
                      type="button"
                      onClick={() => setRejectingId(partner._id)}
                      className="rounded-xl bg-red-500 px-5 py-2 text-sm font-semibold text-white hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                Delivery Partner Details
              </h2>

              <button
                type="button"
                onClick={() => setSelectedPartner(null)}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-600"
              >
                X
              </button>
            </div>

            <div className="grid gap-4 text-sm text-gray-700 md:grid-cols-2">
              <p>
                <b>Name:</b>{" "}
                {selectedPartner.userId?.fullName ||
                  selectedPartner.fullName ||
                  "N/A"}
              </p>

              <p>
                <b>Email:</b>{" "}
                {selectedPartner.userId?.email ||
                  selectedPartner.email ||
                  "N/A"}
              </p>

              <p>
                <b>Phone:</b>{" "}
                {selectedPartner.userId?.phoneNumber ||
                  selectedPartner.phoneNumber ||
                  "N/A"}
              </p>

              <p>
                <b>Date of Birth:</b>{" "}
                {selectedPartner.dateOfBirth || "N/A"}
              </p>

              <p>
                <b>Emergency Contact:</b>{" "}
                {selectedPartner.emergencyContactNumber || "N/A"}
              </p>

              <p>
                <b>Aadhaar Number:</b>{" "}
                {selectedPartner.aadhaarNumber || "N/A"}
              </p>

              <p>
                <b>Vehicle Type:</b>{" "}
                {selectedPartner.vehicleType || "N/A"}
              </p>

              <p>
                <b>Vehicle Number:</b>{" "}
                {selectedPartner.vehicleNumber || "N/A"}
              </p>

              <p>
                <b>Vehicle Model:</b>{" "}
                {selectedPartner.vehicleModel || "N/A"}
              </p>

              <p>
                <b>Driving License:</b>{" "}
                {selectedPartner.drivingLicenseNumber || "N/A"}
              </p>

              <p>
                <b>License Expiry:</b>{" "}
                {selectedPartner.drivingLicenseExpiryDate || "N/A"}
              </p>

              <p>
                <b>Status:</b>{" "}
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                    selectedPartner.approvalStatus
                  )}`}
                >
                  {selectedPartner.approvalStatus || "PENDING"}
                </span>
              </p>

              <p>
                <b>Account Holder:</b>{" "}
                {selectedPartner.bankDetails?.accountHolderName || "N/A"}
              </p>

              <p>
                <b>Bank Name:</b>{" "}
                {selectedPartner.bankDetails?.bankName || "N/A"}
              </p>

              <p>
                <b>Account Number:</b>{" "}
                {selectedPartner.bankDetails?.accountNumber || "N/A"}
              </p>

              <p>
                <b>IFSC:</b>{" "}
                {selectedPartner.bankDetails?.ifscCode || "N/A"}
              </p>

              <p className="md:col-span-2">
                <b>Current Location:</b>{" "}
                {selectedPartner.currentLocation?.latitude || "N/A"},{" "}
                {selectedPartner.currentLocation?.longitude || "N/A"}
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              {selectedPartner.approvalStatus === "PENDING" && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      handleApprove(selectedPartner._id);
                      setSelectedPartner(null);
                    }}
                    className="rounded-xl bg-green-500 px-5 py-2 text-sm font-semibold text-white hover:bg-green-600"
                  >
                    Approve
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRejectingId(selectedPartner._id);
                      setSelectedPartner(null);
                    }}
                    className="rounded-xl bg-red-500 px-5 py-2 text-sm font-semibold text-white hover:bg-red-600"
                  >
                    Reject
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => setSelectedPartner(null)}
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
              Reject Delivery Partner
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

export default DeliveryApprovals;