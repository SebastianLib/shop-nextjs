"use client";
import { Product } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SingleItem from "@/components/shared/SingleItem";

const LatestProducts = ({ products, text }: { products: Product[], text:string }) => {
  return (
    <section className="mt-12 w-full flex flex-col gap-4 overflow-x-hidden">
      <h2 className="text-2xl">{text}</h2>
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
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1500: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
      >
        {products?.map((product) => (
          <SwiperSlide key={product.id}>
            <SingleItem key={product.id} {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default LatestProducts;
