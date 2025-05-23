import { create } from "zustand";

interface AddPanoState {
  googlePanoId: string | null;
  setGooglePanoId: (googlePanoId: string | null) => void;
  position: google.maps.LatLngLiteral;
  setPosition: (position: google.maps.LatLngLiteral) => void;
}

export const useAddPanoStore = create<AddPanoState>()((set) => ({
  googlePanoId: null,
  setGooglePanoId: (googlePanoId) => set({ googlePanoId }),
  position: { lat: 53.54992, lng: 10.00678 },
  setPosition: (position) => set({ position }),
}));
