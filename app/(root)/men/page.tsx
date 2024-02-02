"use client"
import SingleItem from "@/components/shared/SingleItem";
import { ProductParams, getProducts } from "@/lib/db/product";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"

const MenPage = () => {
  const [products, setProducts] = useState<ProductParams[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(()=>{
    const fetchMenProducts = async () => {
      try {
        const productsData = await getProducts("Men");
        setProducts(productsData?.products);
        setLoading(false);

      } catch (error:any) {
        throw new Error(error)
      }
    };

    fetchMenProducts();
  }, []);

  if(loading){
    return <div>loading...</div>
  }

  return (
    <section className="mt-40 container">
        <h1 className="text-5xl font-semibold text-center">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {products?.map(product => (
            <SingleItem key={product.id} {...product}/>
          ))}
          </div>
    </section>
  )
}

export default MenPage