import { useMapStore } from "@/store/map";

const GuessButton = () => {
  const currentGuess = useMapStore((s) => s.currentGuess);
  return (
    <button
      disabled={currentGuess ? false : true}
      //   onClick={handleGuessClick}
      className={`z-50 w-full cursor-pointer rounded-full ${
        currentGuess ? "bg-[#6cb928]" : "bg-[rgba(16,16,28,.6)]"
      }  p-2 text-center font-bold uppercase italic text-white  hover:scale-103`}
    >
      {currentGuess ? "Guess" : "Place your pin on the map"}
    </button>
  );
};

export default GuessButton;
