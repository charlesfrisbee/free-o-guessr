// components/Panorama.tsx
"use client";
import React, { useEffect, useRef } from "react";
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

  // — Create the panorama exactly once
  useEffect(() => {
    if (!panoRef.current && svLib && divRef.current) {
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
          onPanoChanged(panoRef.current!.getPano());
        });
        // Also emit the initial pano
        onPanoChanged(panoRef.current.getPano());
      }
    }
  }, [svLib]);

  useEffect(() => {
    if (!panoRef.current) return;

    if (googlePanoId) {
      panoRef.current.setPano(googlePanoId);
    } else {
      panoRef.current.setPosition(position);
    }
    panoRef.current.setZoom(zoom);
  }, [googlePanoId, position, zoom]);

  return <div ref={divRef} className="absolute inset-0" />;
}
