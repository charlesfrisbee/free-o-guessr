type ResultProgressBarProps = {
  percentage: number;
};

const ResultProgressBar = ({ percentage }: ResultProgressBarProps) => {
  return (
    <div className=" h-2.5 w-[30vw] rounded-full bg-[hsla(0,0%,100%,.2)] dark:bg-gray-700">
      <div
        className="h-2.5 rounded-full bg-[#fecd19]"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ResultProgressBar;
