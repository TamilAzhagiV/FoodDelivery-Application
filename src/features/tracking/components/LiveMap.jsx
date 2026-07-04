import { MapContainer, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import L from "leaflet";

const restaurantIcon = L.divIcon({
  html: "🍴",
  className: "text-3xl",
});

const customerIcon = L.divIcon({
  html: "🏠",
  className: "text-3xl",
});

const deliveryIcon = L.divIcon({
  html: "🛵",
  className: "text-3xl",
});

function LiveMap({
  customerLocation,
  restaurantLocation,
  deliveryLocation,
  height = "500px",
}) {
  const defaultCenter =
    deliveryLocation ||
    customerLocation ||
    restaurantLocation || {
      latitude: 11.0168,
      longitude: 76.9558,
    };

  const routePoints = [restaurantLocation, deliveryLocation, customerLocation]
    .filter(Boolean)
    .map((location) => [location.latitude, location.longitude]);

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <MapContainer
        center={[defaultCenter.latitude, defaultCenter.longitude]}
        zoom={14}
        style={{ height, width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {restaurantLocation && (
          <Marker
            icon={restaurantIcon}
            position={[
              restaurantLocation.latitude,
              restaurantLocation.longitude,
            ]}
          >
            <Popup>Restaurant</Popup>
          </Marker>
        )}

        {deliveryLocation && (
          <Marker
            icon={deliveryIcon}
            position={[deliveryLocation.latitude, deliveryLocation.longitude]}
          >
            <Popup>Delivery Partner</Popup>
          </Marker>
        )}

        {customerLocation && (
          <Marker
            icon={customerIcon}
            position={[customerLocation.latitude, customerLocation.longitude]}
          >
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {routePoints.length >= 2 && <Polyline positions={routePoints} />}
      </MapContainer>
    </div>
  );
}

export default LiveMap;