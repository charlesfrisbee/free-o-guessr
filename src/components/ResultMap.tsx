"use client";
import { Map } from "@vis.gl/react-google-maps";
import GuessMarker from "./GuessMarker";

const ResultMap = () => {
  const position = { lat: 53.54992, lng: 10.00678 };

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
      <GuessMarker />
    </Map>
  );
};

export default ResultMap;
