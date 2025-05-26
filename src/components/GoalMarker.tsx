import { AdvancedMarker } from "@vis.gl/react-google-maps";

type GoalMarkerProps = {
  position: google.maps.LatLngLiteral | null;
};

const GoalMarker = ({ position }: GoalMarkerProps) => {
  if (!position) return null;
  return <AdvancedMarker position={position} />;
};

export default GoalMarker;
