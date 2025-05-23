// app/add/page.tsx
"use client";
import GoogleLocationSearchBox from "@/components/GoogleLocationSearchBox";
import MapProvider from "@/components/MapProvider";
import Panorama from "@/components/Panorama";
import { useAddPanoStore } from "@/store/add-pano";
import { addPano } from "../../actions/add-pano";
import { useTransition } from "react";
import { toast } from "sonner";

export default function AddPage() {
  const [isPending, startTransition] = useTransition();
  // pulled from your Zustand store
  const googlePanoId = useAddPanoStore((s) => s.googlePanoId);
  const position = useAddPanoStore((s) => s.position);
  const setGooglePanoId = useAddPanoStore((s) => s.setGooglePanoId);
  const setPosition = useAddPanoStore((s) => s.setPosition);

  // Clear panoId + update coords when user picks a new place
  function handlePlaceSelected(loc: google.maps.LatLngLiteral) {
    setGooglePanoId(null);
    setPosition(loc);
  }

  const handleSavePano = async () => {
    // your save logic here, e.g. call addPano action
    if (!googlePanoId) return;
    startTransition(async () => {
      try {
        const { success, existing } = await addPano({
          googlePanoId,
          lat: position.lat,
          lng: position.lng,
        });

        if (success) {
          toast.success("Panorama saved! 🎉");
        }
        if (existing) {
          toast.error("Panorama already exists! 😢");
        }

        if (!success && !existing) {
          throw new Error("Something went wrong");
        }
      } catch (err) {
        console.error(err);
        const msg = (err as Error)?.message || "Something went wrong";
        toast.error(msg);
      }
    });
  };

  return (
    <MapProvider>
      {/* top bar: search + save button */}
      <div
        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50
               flex flex-col md:flex-row items-center
               w-11/12 max-w-md
               space-y-2 md:space-y-0 md:space-x-2"
      >
        <GoogleLocationSearchBox
          placeholder="Enter a location…"
          className="w-full md:w-auto"
          onPlaceSelected={handlePlaceSelected}
        />
        <button
          onClick={handleSavePano}
          disabled={isPending}
          className="w-full md:w-48 rounded bg-green-600 px-4 py-2 
                 text-white hover:bg-green-700
                 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Saving…" : "Save"}
        </button>
      </div>

      {/* full-screen Panorama */}
      <div className="absolute inset-0">
        <Panorama
          position={position}
          onPanoChanged={(id) => setGooglePanoId(id)}
        />
      </div>
    </MapProvider>
  );
}
