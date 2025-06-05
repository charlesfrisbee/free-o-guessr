import { create } from "zustand";

export interface MapState {
  mapHiddenMobile: boolean;
  setMapHiddenMobile: (open: boolean) => void;
  currentGuess: google.maps.LatLngLiteral | null;
  setCurrentGuess: (latLng: google.maps.LatLngLiteral | null) => void;
  goal: google.maps.LatLngLiteral | null;
  setGoal: (latLng: google.maps.LatLngLiteral) => void;
}

export const useMapStore = create<MapState>()((set) => ({
  mapHiddenMobile: false,
  setMapHiddenMobile: (open: boolean) => set({ mapHiddenMobile: open }),
  currentGuess: null,
  setCurrentGuess: (latLng) => set({ currentGuess: latLng }),
  goal: null,
  setGoal: (latLng) => set({ goal: latLng }),
}));
