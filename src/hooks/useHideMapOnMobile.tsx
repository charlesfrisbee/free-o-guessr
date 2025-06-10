// hooks/useHideMapOnMobile.ts
import { useEffect } from "react";
import { useMapStore } from "@/store/map";

export function useHideMapOnMobile() {
  const setMapHiddenMobile = useMapStore((s) => s.setMapHiddenMobile);

  useEffect(() => {
    const checkAndSetMapVisibility = () => {
      if (window.innerWidth < 768) {
        setMapHiddenMobile(true);
      } else {
        setMapHiddenMobile(false);
      }
    };

    // Initial check
    checkAndSetMapVisibility();

    // Add resize listener with cleanup
    window.addEventListener("resize", checkAndSetMapVisibility);

    return () => {
      window.removeEventListener("resize", checkAndSetMapVisibility);
    };
  }, [setMapHiddenMobile]);
}
