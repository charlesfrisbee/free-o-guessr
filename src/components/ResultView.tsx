import MapProvider from "./MapProvider";
import PlayNextRoundButton from "./PlayNextRoundButton";
import ResultMap from "./ResultMap";
import ResultProgressBar from "./ResultProgressBar";

const ResultView = () => {
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
          XX points
        </div>
        <ResultProgressBar percentage={75} />
        <div className="font-sans text-white">
          Your guess was xx from the correct location.
        </div>
        <PlayNextRoundButton />
      </div>
    </div>
  );
};

export default ResultView;
