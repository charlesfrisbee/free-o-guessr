"use client";
import { useMapStore } from "@/store/map";
import GuessMap from "./GuessMap";
import MapProvider from "./MapProvider";
import MobileMapToggle from "./MobileMapToggle";
import Panorama from "./Panorama";
import { useEffect } from "react";

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
  const setGoal = useMapStore((s) => s.setGoal);

  useEffect(() => {
    setGoal({ lat: pano.lat, lng: pano.lng });
  }, [pano, setGoal]);

  return (
    <MapProvider>
      <Panorama position={position} />
      <GuessMap />
      <MobileMapToggle />
    </MapProvider>
  );
}

export default GameView;
