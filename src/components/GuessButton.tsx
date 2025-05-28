import { useRouter } from "next/navigation";

type GuessButtonProps = {
  guess: google.maps.LatLngLiteral | null;
};

const GuessButton = ({ guess }: GuessButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (guess) {
      // TODO: send guess to server

      router.push("/result");
    }
  };

  return (
    <button
      disabled={guess ? false : true}
      onClick={handleClick}
      className={`z-50 w-full cursor-pointer rounded-full ${
        guess ? "bg-[#6cb928]" : "bg-[rgba(16,16,28,.6)]"
      }  p-2 text-center font-bold uppercase italic text-white  hover:scale-103`}
    >
      {guess ? "Guess" : "Place your pin on the map"}
    </button>
  );
};

export default GuessButton;
