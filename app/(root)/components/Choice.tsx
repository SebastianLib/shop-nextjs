import woman from "@/assets/woman.jpg";
import man from "@/assets/man.jpg";
import Image from "next/image";
import Link from "next/link";

const Choice = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10">
      <Link href="/women">
        <div className="group relative border cursor-pointer hover:scale-105 transition duration-500 max-w-[500px] h-[400px] md:h-[600px]">
          <Image
            src={woman}
            width={500}
            height={600}
            alt="woman"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex justify-center items-center">
            <h1 className="text-white text-3xl">Women</h1>
          </div>
        </div>
      </Link>

      <Link href="/man">
        <div className="group relative border cursor-pointer hover:scale-105 transition duration-500 max-w-[500px] h-[400px] md:h-[600px]">
          <Image
            src={man}
            width={500}
            height={600}
            alt="man"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex justify-center items-center">
            <h1 className="text-white text-3xl">Man</h1>
          </div>
        </div>
      </Link>


    </div>
  );
};

export default Choice;
