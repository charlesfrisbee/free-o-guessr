"use client";
import React, { useState } from "react";
import MapProvider from "@/components/MapProvider";
import Panorama from "@/components/Panorama";
import GoogleLocationSearchBox from "@/components/GoogleLocationSearchBox";

export default function AddPage() {
  const defaultPosition = { lat: 53.54992, lng: 10.00678 };
  const [panoramaPosition, setPanoramaPosition] = useState(defaultPosition);

  return (
    <MapProvider>
      <div className="absolute top-4 left-1/2 z-50 w-11/12 max-w-md -translate-x-1/2">
        <GoogleLocationSearchBox
          placeholder="Enter a location…"
          className="w-full"
          onPlaceSelected={(loc) => setPanoramaPosition(loc)}
        />
      </div>
      <Panorama position={panoramaPosition} />
    </MapProvider>
  );
}
