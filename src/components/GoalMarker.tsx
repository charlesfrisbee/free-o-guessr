import { useMapStore } from "@/store/map";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import React from "react";

const GoalMarker = () => {
  const goal = useMapStore((s) => s.goal);

  if (!goal) return null;

  return <AdvancedMarker position={goal} />;
};

export default GoalMarker;
