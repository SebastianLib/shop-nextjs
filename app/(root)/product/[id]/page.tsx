"use client";
import { Button } from "@/components/ui/button";
import { handleCart } from "@/lib/db/cart";
import { ProductParams, getProductById } from "@/lib/db/product";
import { currentUser, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SingleProduct = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<ProductParams | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const {userId} = useAuth();
  useEffect(() => {
    const fetchWomenProducts = async () => {
      try {
        const productData = await getProductById(params.id);
        setProduct(productData.product);
        setLoading(false);
      } catch (error: any) {
        throw new Error(error);
      }
    };

    fetchWomenProducts();
  }, []);

  if (!product) {
    return <div>...</div>;
  }

  return (
    <section className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen place-items-center gap-4">
        <div className="w-full">
          <Image
            src={product.image}
            width={500}
            height={500}
            alt={product.name}
            priority={true}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col w-full gap-4">
          <div>
            <h1 className="text-5xl font-semibold">{product.name}</h1>
            <p className="text-2xl text-gray-700">{product.description}</p>
          </div>
          <p className="text-xl">
            {" "}
            {product.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
            <Button onClick={()=>{
              const productId = product.id
              if(!userId || !productId) return null;        
              return handleCart(userId, productId)
            }} variant="main" className="text-2xl max-w-fit p-8">Add to cart</Button>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
