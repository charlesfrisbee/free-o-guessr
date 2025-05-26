import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export function haversineDistance(
  a: google.maps.LatLngLiteral | null,
  b: google.maps.LatLngLiteral | null
): number {
  if (!a || !b) return 0;
  const R = 6371000; // m
  const φ1 = toRad(a.lat);
  const φ2 = toRad(b.lat);
  const Δφ = toRad(b.lat - a.lat);
  const Δλ = toRad(b.lng - a.lng);

  const sinφ = Math.sin(Δφ / 2);
  const sinλ = Math.sin(Δλ / 2);
  const aHarv = sinφ * sinφ + Math.cos(φ1) * Math.cos(φ2) * sinλ * sinλ;
  const c = 2 * Math.atan2(Math.sqrt(aHarv), Math.sqrt(1 - aHarv));
  return R * c;
}

/**
 * Map a distance to a 0–5000 GeoGuessr score.
 *
 * @param distance  Distance from guess to goal, in meters.
 * @param maxDistance  Diagonal (in meters) of the map’s bounding box.
 *                     For the world map you can approximate
 *                     ≈ 20 037 508 m (half Earth’s circumference).
 */
export function geoguessrScore(
  distance: number,
  maxDistance: number = 20037508
): number {
  const raw = 5000 * Math.exp((-10 * distance) / maxDistance);
  return Math.round(raw);
}

export function formatDistance(distanceMeters: number): string {
  if (distanceMeters < 1000) {
    const m = Math.round(distanceMeters);
    return `${m} m`;
  } else {
    const km = Math.round(distanceMeters / 1000);
    return `${km} km`;
  }
}
