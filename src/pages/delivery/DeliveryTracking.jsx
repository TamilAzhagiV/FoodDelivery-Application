import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import useLiveLocation from "../../features/tracking/hooks/useLiveLocation";
import { emitLocationUpdate } from "../../features/tracking/services/socketService";
import LiveMap from "../../features/tracking/components/LiveMap";

function DeliveryTracking() {
  const { orderId } = useParams();

  const [sharing, setSharing] = useState(false);
  const [lastSentAt, setLastSentAt] = useState("");

  const handleLocationChange = useCallback(
    (location) => {
      emitLocationUpdate({
        orderId,
        latitude: location.latitude,
        longitude: location.longitude,
      });

      setLastSentAt(new Date().toLocaleTimeString());
    },
    [orderId]
  );

  const { location, error } = useLiveLocation({
    enabled: sharing,
    onLocationChange: handleLocationChange,
  });

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Delivery Tracking
        </h1>

        <p className="text-sm text-gray-500">
          Share your live GPS location with the customer.
        </p>
      </div>

      <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800">
          Order #{orderId}
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Open this page in delivery partner mobile Chrome and allow location
          permission.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setSharing(true)}
            className="rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-white"
          >
            Start Sharing Location
          </button>

          <button
            type="button"
            onClick={() => setSharing(false)}
            className="rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white"
          >
            Stop Sharing
          </button>
        </div>

        <div className="mt-5 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
          <p>
            Status:{" "}
            <span className="font-bold">
              {sharing ? "Sharing live location" : "Not sharing"}
            </span>
          </p>

          <p>Last Sent: {lastSentAt || "Not sent yet"}</p>

          {location && (
            <>
              <p>Latitude: {location.latitude}</p>
              <p>Longitude: {location.longitude}</p>
              <p>Accuracy: {Math.round(location.accuracy)} meters</p>
            </>
          )}

          {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>
      </div>

      <LiveMap
        deliveryLocation={location}
        height="450px"
      />
    </DashboardLayout>
  );
}

export default DeliveryTracking;