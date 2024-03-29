"use client";
import { getLatestProducts } from "@/lib/db/product";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const LatestProducts = ({ products }: { products: Product[] }) => {

  return (
    <div className="mt-12 w-full flex flex-col gap-4 overflow-x-hidden">
      <h2 className="text-2xl">Latest Products</h2>
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className="w-full flex items-center justify-center"
      breakpoints={{
        420: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        700: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1000: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1500: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
    >
      {products?.map((product) => (
        <SwiperSlide key={product.id}>
          <Link href={`/product/${product?.id}`} key={product?.id}>
            <div className="flex flex-col p-4 rounded-xl h-[480px] border gap-4 transition hover:bg-slate-50">
              <Image
                src={product.image}
                width={300}
                height={450}
                alt={product.name}
                priority={true}
                className="w-full h-80 max-h-80 object-contain"
              />
              <div>
                <h2 className="text-2xl line-clamp-1">{product.name}</h2>
                <p className="text-gray-600">{product.description.substring(0, 40)}...</p>
                <p className="mt-2 text-lg">
                  {product.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  );
};

export default LatestProducts;
