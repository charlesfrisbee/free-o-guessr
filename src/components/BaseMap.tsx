import { Map } from "@vis.gl/react-google-maps";
import React from "react";

type BaseMapProps = {
  children: React.ReactNode;
  position: google.maps.LatLngLiteral;
};

const BaseMap = ({ children, position }: BaseMapProps) => {
  return (
    <Map
      className={`h-full w-full`}
      defaultCenter={position}
      defaultZoom={10}
      mapId="DEMO_MAP_ID"
      streetViewControl={false}
      mapTypeControl={false}
      fullscreenControl={false}
      cameraControl={false}
      zoomControl={false}
      clickableIcons={false}
      gestureHandling={"greedy"}
    >
      {children}
    </Map>
  );
};

export default BaseMap;
