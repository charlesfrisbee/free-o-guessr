"use client";
import { APIProvider } from "@vis.gl/react-google-maps";
import React from "react";

type MapProviderProps = {
  children: React.ReactNode;
};

const MapProvider = ({ children }: MapProviderProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Configuration Error</h2>
          <p className="text-gray-600">Google Maps API key is not configured.</p>
          <p className="text-sm text-gray-500 mt-2">
            Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      {children}
    </APIProvider>
  );
};

export default MapProvider;
