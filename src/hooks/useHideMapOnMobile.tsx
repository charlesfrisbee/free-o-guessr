// hooks/useHideMapOnMobile.ts
import { useEffect } from "react";
import { useMapStore } from "@/store/map";

export function useHideMapOnMobile() {
  const setMapHiddenMobile = useMapStore((s) => s.setMapHiddenMobile);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMapHiddenMobile(true);
    }
  }, [setMapHiddenMobile]);
}
