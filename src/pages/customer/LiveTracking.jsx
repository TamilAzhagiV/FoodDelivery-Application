import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CustomerLayout from "../../components/layout/CustomerLayout";
import LiveMap from "../../features/tracking/components/LiveMap";
import { listenDeliveryLocation } from "../../features/tracking/services/socketService";
import {
  calculateDistanceInKm,
  calculateEtaMinutes,
} from "../../features/tracking/utils/mapUtils";

function LiveTracking() {
  const { orderId } = useParams();

  const [deliveryLocation, setDeliveryLocation] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");
  const [status, setStatus] = useState("Waiting for delivery location...");

  const customerLocation = {
    latitude: 11.0168,
    longitude: 76.9558,
  };

  useEffect(() => {
    const unsubscribe = listenDeliveryLocation((data) => {
      if (data.orderId !== orderId) return;

      setDeliveryLocation({
        latitude: data.latitude,
        longitude: data.longitude,
      });

      setLastUpdated(new Date().toLocaleTimeString());
      setStatus("Delivery partner is on the way");
    });

    return () => {
      unsubscribe();
    };
  }, [orderId]);

  const distance = calculateDistanceInKm(deliveryLocation, customerLocation);
  const eta = calculateEtaMinutes(Number(distance));

  return (
    <CustomerLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Live Tracking</h1>
        <p className="text-sm text-gray-500">
          Track your delivery partner live.
        </p>
      </div>

      <div className="mb-6 grid gap-5 md:grid-cols-3">
        <InfoCard title="Status" value={status} />
        <InfoCard title="Distance" value={deliveryLocation ? `${distance} km` : "Waiting"} />
        <InfoCard title="ETA" value={deliveryLocation ? `${eta} mins` : "Waiting"} />
      </div>

      <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800">Order #{orderId}</h2>

        <div className="mt-4 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
          <p>Last Updated: {lastUpdated || "Not yet received"}</p>

          {deliveryLocation ? (
            <>
              <p>Latitude: {deliveryLocation.latitude}</p>
              <p>Longitude: {deliveryLocation.longitude}</p>
            </>
          ) : (
            <p className="text-orange-500">
              Waiting for delivery partner to start sharing location.
            </p>
          )}
        </div>
      </div>

      <LiveMap
        customerLocation={customerLocation}
        deliveryLocation={deliveryLocation}
        height="500px"
      />
    </CustomerLayout>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-3 text-xl font-bold text-orange-500">{value}</p>
    </div>
  );
}

export default LiveTracking;