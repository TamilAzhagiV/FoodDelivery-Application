import { useEffect, useRef, useState } from "react";

function useLiveLocation({ enabled = false, onLocationChange }) {
  const watchIdRef = useRef(null);

  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!enabled) {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }

      return;
    }

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          updatedAt: new Date().toISOString(),
        };

        setLocation(currentLocation);

        if (onLocationChange) {
          onLocationChange(currentLocation);
        }
      },
      (error) => {
        setError(error.message || "Unable to fetch location");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      }
    );

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [enabled, onLocationChange]);

  return {
    location,
    error,
  };
}

export default useLiveLocation;