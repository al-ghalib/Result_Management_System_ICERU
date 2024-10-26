import LoadingSVG from "@/public/Infinity.svg";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="h-[90vh] w-full flex justify-center items-center">
      <div className="m-2">
        <Image src={LoadingSVG} width={200} height={100} alt="Infinity loading" />
      </div>
    </div>
  );
};

export default Loading;
