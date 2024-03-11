"use client";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import { handleCart } from "@/lib/db/cart";
import {  getProductById } from "@/lib/db/product";
import { formatPrice } from "@/lib/formatPrice";
import { useAuth } from "@clerk/nextjs";
import { Product, Size } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter} from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


const SingleProduct = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product &{
    size: Size | null,
  }>();
  const [loading, setLoading] = useState<boolean>(true);
  const {userId} = useAuth();
  const router = useRouter()
  
  const handleProduct = async(productId:string) => {
    try {
      if(!userId || !productId) return null;   
      
      await handleCart(userId, productId);
      toast.success("the product has been added!")
      router.refresh()
    } catch (error: any) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getProductById(params.id);
        if(!productData) throw new Error("Product not found")
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
    return redirect("/")
  }
  return (
    <section className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen place-items-center gap-8 py-4 mt-20 md:mt-0">
        <div className="w-full flex justify-center  md:self-center self-end">
          <Image
            src={product.image}
            width={500}
            height={500}
            alt={product.name}
            priority={true}
            className="object-cover w-auto min-w-[250px] lg:min-w-[500px] max-h-[400px] md:max-h-[600px] "
          />  
        </div>
        <div className="flex flex-col self-start md:self-center w-full gap-4 ">
          <div className="flex flex-col gap-2 md:gap-4">
            <h1 className="text-3xl lg:text-5xl font-semibold">{product.name}</h1>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold">size: {product?.size?.size}</p>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700">{product.description}</p>
          </div>
          <p className="text-xl font-semibold">
            {formatPrice(product.price)}
          </p>
          <div className="flex xs:flex-col sm:flex-row gap-4">
          <Button disabled={!userId} onClick={()=>handleProduct(product.id)} variant="main" className="text-2xl max-w-fit p-8">Add to cart</Button>
            <Link className={`${userId ? "hidden": "flex"}`} href="/sign-in">
              <Button variant="main"  className="text-2xl max-w-fit p-8">Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
