"use client";
import { ProductParams } from "@/lib/db/product";
import { formatPrice } from "@/lib/formatPrice";
import Image from "next/image";
import Link from "next/link";

const SingleItem = (product: ProductParams) => {
  return (
    <Link href={`/product/${product?.id}`} key={product?.id}>
      <div className="flex flex-col p-4 rounded-xl h-[480px] border gap-4 transition hover:bg-slate-50">
        <Image
          src={product?.image}
          width={300}
          height={450}
          alt={product?.name}
          priority={true}
          className="w-full h-80 max-h-80 object-cover object-center"
        />
        <div>
          <h2 className="text-2xl">{product?.name}</h2>
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
