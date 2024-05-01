"use client";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/lib/db/product";
import { formatPrice } from "@/utils/formatPrice";
import { useAuth } from "@clerk/nextjs";
import { Product, Size } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "./loading";
import { useShoppingCartContext } from "@/context/shoppingCart";
import PageLayout from "@/components/shared/PageLayout";

const SingleProduct = ({ params }: { params: { id: string } }) => {
  const { addProduct } = useShoppingCartContext();
  const [product, setProduct] = useState<
    Product & {
      size: Size | null;
    }
  >();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getProductById(params.id);
        if (!productData) throw new Error("Product not found");
        setProduct(productData);
      } catch (error: any) {
        throw new Error(error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return redirect("/");
  }
  return (
    <PageLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-8 py-4 mt-20 md:mt-0">
        <div className="relative flex justify-center w-full h-full min-w-[300px] min-h-[450px] max-w-[400px] max-h-[650px]">
          <Image
            src={product.image}
            fill
            alt={product.name}
            priority={true}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col self-start md:self-center w-full gap-4 ">
          <div className="xs:text-center md:text-left flex flex-col gap-2 md:gap-4">
            <h1 className=" text-3xl lg:text-5xl font-semibold">
              {product.name}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold">
              size: {product?.size?.size}
            </p>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700">
              {product.description}
            </p>
          </div>
          <p className="xs:text-center md:text-left text-xl font-semibold">{formatPrice(product.price)}</p>
          <div className="flex xs:flex-col sm:flex-row gap-4">
            <Button
              onClick={() => addProduct(product)}
              variant="main"
              className="text-2xl xs:w-full md:max-w-fit p-8"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
      </PageLayout>
  );
};

export default SingleProduct;
