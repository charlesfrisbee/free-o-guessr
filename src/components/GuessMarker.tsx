import { AdvancedMarker } from "@vis.gl/react-google-maps";

type GuessMarkerProps = {
  position: google.maps.LatLngLiteral | null;
};

const GuessMarker = ({ position }: GuessMarkerProps) => {
  if (!position) return null;

  return <AdvancedMarker position={position} />;
};

export default GuessMarker;
