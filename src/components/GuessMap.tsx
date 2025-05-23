"use client";
import { Map } from "@vis.gl/react-google-maps";

const GuessMap = () => {
  const position = { lat: 53.54992, lng: 10.00678 };

  return (
    <Map
      className={`aspect-square md:aspect-video absolute bottom-5 z-50 flex w-full flex-col transition-all delay-200 ease-in-out  md:right-10 md:w-[24vw] md:gap-3 md:opacity-60 md:hover:w-[42vw] md:hover:opacity-100`}
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
    ></Map>
  );
};

export default GuessMap;
