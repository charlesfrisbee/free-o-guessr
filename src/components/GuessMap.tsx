import { useHideMapOnMobile } from "@/hooks/useHideMapOnMobile";
import { useMapStore } from "@/store/map";
import { Map } from "@vis.gl/react-google-maps";
import GuessButton from "./GuessButton";
import GuessMarker from "./GuessMarker";
import MobileMapCloseButton from "./MobileMapCloseButton";

const GuessMap = () => {
  const position = { lat: 53.54992, lng: 10.00678 };
  const mapHiddenMobile = useMapStore((s) => s.mapHiddenMobile);
  const setCurrentGuess = useMapStore((s) => s.setCurrentGuess);
  const guess = useMapStore((s) => s.currentGuess);

  useHideMapOnMobile();

  return (
    <Map
      className={`aspect-square md:aspect-video absolute bottom-5 z-50 flex w-full flex-col transition-all delay-200 ease-in-out ${
        mapHiddenMobile ? "hidden" : "visible"
      } md:right-10 md:w-[24vw] md:gap-3 md:opacity-60 md:hover:w-[42vw] md:hover:opacity-100`}
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
      onClick={(e) => {
        const latLng = e.detail.latLng;
        if (!latLng) return;
        setCurrentGuess({ lat: latLng.lat, lng: latLng.lng });
      }}
    >
      <GuessMarker position={guess} />
      <MobileMapCloseButton />
      <GuessButton guess={guess} />
    </Map>
  );
};

export default GuessMap;
