import MapProvider from "@/components/MapProvider";
import Panorama from "@/components/Panorama";

export default function Home() {
  const position = { lat: 40.7128, lng: -74.0059 };
  return (
    <main className="h-screen">
      <MapProvider>
        <Panorama position={position} />
      </MapProvider>
    </main>
  );
}
