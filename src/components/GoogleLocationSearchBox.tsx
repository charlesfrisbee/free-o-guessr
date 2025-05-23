"use client";
import React, { useEffect, useRef } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export type GoogleLocationSearchBoxProps = {
  onPlaceSelected?: (location: google.maps.LatLngLiteral) => void;
  placeholder?: string;
  className?: string;
};

export default function GoogleLocationSearchBox({
  onPlaceSelected,
  placeholder = "Search for a place…",
  className = "",
}: GoogleLocationSearchBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const placesLib = useMapsLibrary("places");

  useEffect(() => {
    if (!placesLib || !inputRef.current) return;

    // Create the SearchBox
    const searchBox = new google.maps.places.SearchBox(inputRef.current);

    // Listen for user selection
    const listener = searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places && places[0]?.geometry?.location) {
        const loc = places[0].geometry.location.toJSON();
        onPlaceSelected?.(loc);
      }
    });

    return () => {
      google.maps.event.removeListener(
        listener as google.maps.MapsEventListener
      );
    };
  }, [placesLib, onPlaceSelected]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      className={`px-3 py-2 rounded border shadow-md ${className} bg-white text-black`}
    />
  );
}
