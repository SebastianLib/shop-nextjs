"use client";
import { Product } from "@prisma/client";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";

const SingleItem = (product: Product) => {
  return (
    <Link href={`/product/${product?.id}`} key={product?.id}>
      <div className="flex flex-col p-4 rounded-xl h-[480px] border gap-4 transition hover:bg-slate-50">
        <div className="relative w-full h-full max-h-[450px]">
        <Image
          src={product?.image}
          fill
          sizes="w-full"
          alt={product?.name}
          priority={true}
          className=" object-cover object-center"
        />
        </div>
        <div>
          <h2 className="text-2xl line-clamp-1">{product?.name}</h2>
          <p className="text-gray-600">
            {product?.description.substring(0, 40)}...
          </p>
          <p className="mt-2 text-lg">{formatPrice(product?.price)}</p>
        </div>
      </div>
    </Link>
  );
};

export default SingleItem;
