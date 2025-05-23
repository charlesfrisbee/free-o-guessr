"use client";
import React from "react";
import { useMapStore } from "@/store/map";

const MobileMapToggle = () => {
  const mapHiddenMobile = useMapStore((s) => s.mapHiddenMobile);
  const setMapHiddenMobile = useMapStore((s) => s.setMapHiddenMobile);

  return (
    <div
      className={`${
        mapHiddenMobile ? "visible" : "hidden"
      } absolute bottom-8 right-4 z-50 block md:invisible`}
    >
      <button
        id="button"
        className="z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#6cb928] shadow-inner hover:cursor-pointer"
        onClick={() => setMapHiddenMobile(false)}
      >
        <img src="https://www.geoguessr.com/_next/static/media/map.8b3b27ab.svg" />
      </button>
    </div>
  );
};

export default MobileMapToggle;
