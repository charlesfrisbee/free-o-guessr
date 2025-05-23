import { useMapStore } from "@/store/map";

const MobileMapCloseButton = () => {
  const setMapHiddenMobile = useMapStore((s) => s.setMapHiddenMobile);
  return (
    <div className={`absolute right-2 top-2 z-50 md:invisible`}>
      <button
        onClick={() => {
          setMapHiddenMobile(true);
        }}
        className="z-50 flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(0,0,0,.9)] hover:cursor-pointer"
      >
        <img src="https://www.geoguessr.com/_next/static/images/close-1facaa8a3bbabb8df3196a38c71bb36a.svg" />
      </button>
    </div>
  );
};

export default MobileMapCloseButton;
