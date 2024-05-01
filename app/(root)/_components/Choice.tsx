import woman from "@/assets/woman.jpg";
import man from "@/assets/man.jpg";
import Image from "next/image";
import Link from "next/link";

const Choice = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 container mx-auto">
      <Link href="/women" className="flex xs:justify-center md:justify-end">
        <div className="relative border cursor-pointer hover:scale-105 transition duration-500 w-full h-full max-w-[350px] md:max-w-[450px] min-h-[400px] lg:min-h-[600px]">
          <Image
            src={woman}
            fill
            alt="woman"
            sizes="w-full"
            priority={true}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition duration-500 flex justify-center items-center">
            <h1 className="text-white text-3xl">Women</h1>
          </div>
        </div>
      </Link>

      <Link href="/men" className="flex xs:justify-center md:justify-start">
        <div className=" relative border cursor-pointer hover:scale-105 transition duration-500 w-full h-full max-w-[350px] md:max-w-[450px] min-h-[400px] lg:min-h-[600px]">
          <Image
            src={man}
            fill
            alt="men"
            sizes="w-full"
            priority={true}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition duration-500 flex justify-center items-center">
            <h1 className="text-white text-3xl">Men</h1>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Choice;
