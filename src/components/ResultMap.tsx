"use client";

import GuessMarker from "./GuessMarker";
import GoalMarker from "./GoalMarker";
import BaseMap from "./BaseMap";
import Arc from "./Arc";
import { useMapStore } from "@/store/map";
import { useFitBounds } from "@/hooks/useFitBounds";

const ResultMap = () => {
  const position = { lat: 53.54992, lng: 10.00678 };

  const guess = useMapStore((s) => s.currentGuess);
  const goal = useMapStore((s) => s.goal);

  // Fit the map to include both guess and goal
  useFitBounds([guess, goal]);

  return (
    <BaseMap position={position}>
      <GuessMarker />
      <GoalMarker />
      <Arc />
    </BaseMap>
  );
};

export default ResultMap;
