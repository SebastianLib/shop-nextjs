"use client";
import Pagination from "@/components/shared/Pagination";
import SingleItem from "@/components/shared/SingleItem";
import { getAllProducts } from "@/lib/db/product";
import { Product } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface AllProductsProps{
  products:Product[],
  totalProductsPages:number
}

const AllProducts = ({products, totalProductsPages}:AllProductsProps) => {

  return (
    <div className="mt-12 w-full flex flex-col gap-4 overflow-x-hidden">
      <h2 className="text-2xl">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product) => (
          <SingleItem key={product.id} {...product} />
        ))}
      </div>

      <Pagination totalProductsPages={totalProductsPages} />
    </div>
  );
};

export default AllProducts;
