"use client";
import { formatDistance, geoguessrScore, haversineDistance } from "@/lib/utils";
import { useMapStore } from "@/store/map";
import MapProvider from "./MapProvider";
import PlayNextRoundButton from "./PlayNextRoundButton";
import ResultMap from "./ResultMap";
import ResultProgressBar from "./ResultProgressBar";

const ResultView = () => {
  const guess = useMapStore((s) => s.currentGuess);
  const goal = useMapStore((s) => s.goal);

  const dist = haversineDistance(guess, goal);

  // 2) compute score (world-map default):
  const score = geoguessrScore(dist);

  const scorePercentage = (score / 5000) * 100;

  return (
    <div style={{ height: "100vh" }}>
      <div className="h-[60vh]">
        <MapProvider>
          <ResultMap />
        </MapProvider>
      </div>
      <div
        style={{
          backgroundImage:
            "linear-gradient(transparent,#000),linear-gradient(90deg,#28374c,#221d6c)",
          height: "40vh",
        }}
        className="flex flex-col items-center justify-center gap-4"
      >
        <div className=".6s text-xl font-bold italic text-[#fecd19]">
          {score} points
        </div>
        <ResultProgressBar percentage={scorePercentage} />
        <div className="font-sans text-white">
          Your guess was {formatDistance(dist)} from the correct location.
        </div>
        <PlayNextRoundButton />
      </div>
    </div>
  );
};

export default ResultView;
