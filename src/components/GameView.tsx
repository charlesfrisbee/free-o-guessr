"use client";
import GuessMap from "./GuessMap";
import MapProvider from "./MapProvider";
import MobileMapToggle from "./MobileMapToggle";
import Panorama from "./Panorama";

type Pano = {
  lat: number;
  lng: number;
  googlePanoId: string;
};

type GameViewProps = {
  pano: Pano;
};

function GameView({ pano }: GameViewProps) {
  const position = { lat: pano.lat, lng: pano.lng };
  return (
    <MapProvider>
      <Panorama position={position} />
      <GuessMap />
      <MobileMapToggle />
    </MapProvider>
  );
}

export default GameView;
