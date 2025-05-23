import { useMapStore } from "@/store/map";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import React from "react";

const GuessMarker = () => {
  const currentGuess = useMapStore((s) => s.currentGuess);

  if (!currentGuess) return null;

  return <AdvancedMarker position={currentGuess} />;
};

export default GuessMarker;
