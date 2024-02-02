"use client";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import { handleCart } from "@/lib/db/cart";
import { ProductParams, getProductById } from "@/lib/db/product";
import { currentUser, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
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
      } catch (error: any) {
        throw new Error(error);
      }
      setLoading(false);
    };

    fetchWomenProducts();
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
          {/* <Dialog>
          <DialogContent className="sm:max-w-[425px] p-2">
          <Image
            src={product.image}
            width={700}
            height={500}
            alt={product.name}
            priority={true}
            className="object-cover w-auto b"
          /> 
          
          </DialogContent>
        </Dialog> */}
        </div>
        <div className="flex flex-col self-start md:self-center w-full gap-4 ">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl lg:text-5xl font-semibold">{product.name}</h1>
            <p className="text-xl lg:text-2xl text-gray-700">{product.description}</p>
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
