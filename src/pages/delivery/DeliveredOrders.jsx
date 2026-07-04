import DashboardLayout from "../../components/layout/DashboardLayout";

function DeliveredOrders() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Delivered Orders
        </h1>

        <p className="text-sm text-gray-500">
          Delivered order history will be shown here once backend API is ready.
        </p>
      </div>

      <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-700">
          Delivery History Coming Soon
        </h2>

        <p className="mt-2 text-gray-500">
          Waiting for backend API like GET /delivery-orders/history.
        </p>
      </div>
    </DashboardLayout>
  );
}

export default DeliveredOrders;