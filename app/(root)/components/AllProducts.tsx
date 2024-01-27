"use client";
import { ProductParams, getAllProducts } from "@/lib/db/product";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const AllProducts = () => {
  const [products, setProducts] = useState<ProductParams[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();

        setProducts(productsData?.products);
      } catch (error: any) {
        throw new Error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mt-12 w-full flex flex-col gap-4 overflow-x-hidden">
      <h1 className="text-2xl">All Products</h1>
      {/* <div className='flex gap-14'>
            {products?.map((product) =>(
                <Link href={`/product/${product?.id}`} key={product?.id}>
                <div className='flex flex-col p-4 rounded-xl shadow-lg gap-4 hover:scale-105 transition-transform'>
                    <Image src={product.image} width={300} height={450} alt={product.name} className='w-[300px] h-80 object-contain'/>
                    <div>
                    <h2 className='text-2xl'>{product.name}</h2>
                    <p className='text-gray-600'>{product.description}</p>
                    <p className='mt-4 text-lg'>{product.price.toLocaleString("en-US", {style:"currency", currency:"USD"})}</p>
                    </div>
                </div>
                </Link>
            ))}
        </div> */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        className="w-full flex items-center justify-center"
      >
        {products?.map((product) => (
          <SwiperSlide>
            <Link href={`/product/${product?.id}`} key={product?.id}>
              <div className="flex flex-col p-4 rounded-xl border gap-4">
                <Image
                  src={product.image}
                  width={300}
                  height={450}
                  alt={product.name}
                  className="w-full h-80 object-contain"
                />
                <div>
                  <h2 className="text-2xl">{product.name}</h2>
                  <p className="text-gray-600">{product.description}</p>
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

export default AllProducts;
