import DashboardLayout from "../../components/layout/DashboardLayout";

function DeliveryApprovalStatus() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <DashboardLayout>
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">
          Delivery Approval Status
        </h1>

        <p className="mt-3 text-gray-500">
          Your delivery partner profile is not verified yet. Once admin approves
          your profile, you can access Delivery Orders.
        </p>

        <div className="mt-6 rounded-2xl bg-yellow-50 p-5 text-yellow-700">
          Current Status:{" "}
          <span className="font-bold">
            {user?.isVerified ? "VERIFIED" : "NOT VERIFIED"}
          </span>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DeliveryApprovalStatus;