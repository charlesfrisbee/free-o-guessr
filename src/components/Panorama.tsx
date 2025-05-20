// components/Panorama.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export default function Panorama({
  position,
  pov = { heading: 0, pitch: 0 },
  zoom = 1,
}: {
  position: google.maps.LatLngLiteral;
  pov?: google.maps.StreetViewPov;
  zoom?: number;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const panoRef = useRef<google.maps.StreetViewPanorama | null>(null);
  const svLib = useMapsLibrary("streetView");

  // 1) Create the panorama once, when the library and container are ready
  useEffect(() => {
    if (!panoRef.current && svLib && divRef.current) {
      panoRef.current = new svLib.StreetViewPanorama(divRef.current, {
        position,
        pov,
        zoom,
        disableDefaultUI: true,
        motionTracking: false,
        motionTrackingControl: false,
        clickToGo: false,
        scrollwheel: false,
        panControl: false,
        zoomControl: false,
        linksControl: false,
        addressControl: false,
        fullscreenControl: false,
        showRoadLabels: false,
        enableCloseButton: false,
      });
    }
  }, [svLib]);

  // 2) Update position & zoom whenever props change
  useEffect(() => {
    if (panoRef.current) {
      panoRef.current.setPosition(position);
      panoRef.current.setZoom(zoom);
    }
  }, [position, zoom]);

  return <div ref={divRef} className="absolute inset-0" />;
}
