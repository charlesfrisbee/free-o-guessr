// Arc.tsx
"use client";

import { useEffect, useMemo } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useMapStore } from "@/store/map";

const Arc = () => {
  const map = useMap(); // the raw google.maps.Map
  const geometry = useMapsLibrary("geometry"); // 📐 loads google.maps.geometry
  const guess = useMapStore((s) => s.currentGuess);
  const goal = useMapStore((s) => s.goal);

  // Build an array of LatLngs by interpolating along the great circle
  const path = useMemo(() => {
    if (!geometry || !guess || !goal) return [];

    const { spherical } = geometry;
    const from = new google.maps.LatLng(guess.lat, guess.lng);
    const to = new google.maps.LatLng(goal.lat, goal.lng);
    const steps = 60; // tweak for smoothness vs. performance

    const pts: google.maps.LatLngLiteral[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const interp: google.maps.LatLng = spherical.interpolate(from, to, t);
      pts.push({ lat: interp.lat(), lng: interp.lng() });
    }
    return pts;
  }, [geometry, guess, goal]);

  // Create (and clean up) a Polyline on every change
  useEffect(() => {
    if (!map || path.length < 2) return;
    const arc = new google.maps.Polyline({
      map,
      path,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      geodesic: false, // we've already computed geodesic ourselves
    });
    return () => void arc.setMap(null);
  }, [map, path]);

  return null;
};

export default Arc;
