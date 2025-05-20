"use client";
import { APIProvider } from "@vis.gl/react-google-maps";
import React from "react";

type MapProviderProps = {
  children: React.ReactNode;
};

const MapProvider = ({ children }: MapProviderProps) => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      {children}
    </APIProvider>
  );
};

export default MapProvider;
