"use client";
import { useMapStore } from "@/store/map";
import { useRouter } from "next/navigation";
import React from "react";

const PlayNextRoundButton = () => {
  const setCurrentGuess = useMapStore((s) => s.setCurrentGuess);
  const router = useRouter();

  const handleClick = () => {
    setTimeout(() => {
      setCurrentGuess(null);
    }, 100);
    router.push("/");
  };

  return (
    <button
      onClick={handleClick}
      className="z-50 cursor-pointer rounded-full bg-[#6cb928]  py-2 px-10 text-center font-bold uppercase italic text-white hover:scale-103"
    >
      Play Next Round
    </button>
  );
};

export default PlayNextRoundButton;
