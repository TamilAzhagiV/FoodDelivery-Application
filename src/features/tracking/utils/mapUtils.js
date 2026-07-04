export function calculateDistanceInKm(locationA, locationB) {
  if (!locationA || !locationB) return 0;

  const earthRadius = 6371;

  const lat1 = (locationA.latitude * Math.PI) / 180;
  const lat2 = (locationB.latitude * Math.PI) / 180;

  const diffLat = ((locationB.latitude - locationA.latitude) * Math.PI) / 180;
  const diffLng = ((locationB.longitude - locationA.longitude) * Math.PI) / 180;

  const a =
    Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(diffLng / 2) *
      Math.sin(diffLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return (earthRadius * c).toFixed(2);
}

export function calculateEtaMinutes(distanceKm) {
  if (!distanceKm) return 0;

  const averageSpeedKmPerHour = 25;
  const eta = (distanceKm / averageSpeedKmPerHour) * 60;

  return Math.ceil(eta);
}