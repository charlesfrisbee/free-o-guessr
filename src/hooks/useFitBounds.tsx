// useFitBounds.ts
"use client";

import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";

export function useFitBounds(points: (google.maps.LatLngLiteral | null)[]) {
  const map = useMap();

  useEffect(() => {
    // Only fit when map is ready and we have at least two valid points
    const valid = points.filter((p) => !!p);
    if (!map || valid.length < 2) return;

    const bounds = new google.maps.LatLngBounds();
    valid.forEach((pt) => bounds.extend(pt));
    map.fitBounds(bounds);
  }, [map, points]);
}
