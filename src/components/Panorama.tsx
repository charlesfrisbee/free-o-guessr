// components/Panorama.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useAddPanoStore } from "@/store/add-pano";

export type PanoramaProps = {
  position: google.maps.LatLngLiteral;
  zoom?: number;
  onPanoChanged?: (panoId: string) => void;
};

export default function Panorama({
  position,
  zoom = 1,
  onPanoChanged,
}: PanoramaProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const panoRef = useRef<google.maps.StreetViewPanorama | null>(null);
  const svLib = useMapsLibrary("streetView");
  const googlePanoId = useAddPanoStore((s) => s.googlePanoId);
  const [error, setError] = useState<string | null>(null);

  // — Create the panorama exactly once
  useEffect(() => {
    if (!panoRef.current && svLib && divRef.current) {
      try {
        panoRef.current = new svLib.StreetViewPanorama(divRef.current, {
          ...(googlePanoId ? { pano: googlePanoId } : { position }),
          zoom,
          disableDefaultUI: true,
          addressControl: false,
          linksControl: false,
          showRoadLabels: false,
          panControl: false,
          zoomControl: false,
          fullscreenControl: false,
          clickToGo: false,
          motionTracking: false,
          motionTrackingControl: false,
        });

        if (onPanoChanged) {
          // Fire whenever the pano actually changes
          panoRef.current.addListener("pano_changed", () => {
            if (panoRef.current) {
              onPanoChanged(panoRef.current.getPano());
            }
          });
          // Also emit the initial pano
          onPanoChanged(panoRef.current.getPano());
        }
        
        setError(null);
      } catch (err) {
        console.error("Failed to create Street View panorama:", err);
        setError("Failed to load Street View. Please try refreshing the page.");
      }
    }
  }, [svLib, googlePanoId, position, zoom, onPanoChanged]);

  useEffect(() => {
    if (!panoRef.current) return;

    try {
      if (googlePanoId) {
        panoRef.current.setPano(googlePanoId);
      } else {
        panoRef.current.setPosition(position);
      }
      panoRef.current.setZoom(zoom);
      setError(null);
    } catch (err) {
      console.error("Failed to update panorama:", err);
      setError("Failed to update Street View location.");
    }
  }, [googlePanoId, position, zoom]);

  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-600 mb-2">{error}</p>
          <button
            onClick={() => setError(null)}
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return <div ref={divRef} className="absolute inset-0" />;
}
