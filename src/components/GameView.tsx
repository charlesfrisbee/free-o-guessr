"use client";
import GuessMap from "./GuessMap";
import MapProvider from "./MapProvider";
import MobileMapToggle from "./MobileMapToggle";
import Panorama from "./Panorama";

function GameView() {
  const position = { lat: 53.54992, lng: 10.00678 };
  return (
    <MapProvider>
      <Panorama position={position} />
      <GuessMap />
      <MobileMapToggle />
    </MapProvider>
  );
}

export default GameView;
