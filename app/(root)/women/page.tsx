"use client"
import { ProductParams, getWomenProducts } from "@/lib/db/product";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"

const WomenPage = () => {
  const [products, setProducts] = useState<ProductParams[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(()=>{
    const fetchWomenProducts = async () => {
      try {
        const productsData = await getWomenProducts();
        setProducts(productsData?.products);
        setLoading(false);

      } catch (error:any) {
        throw new Error(error)
      }
    };

    fetchWomenProducts();
  }, []);

  return (
    <section className="mt-40 container">
        <h1 className="text-5xl font-semibold text-center">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {products?.map(product => (
              <Link href={`/product/${product?.id}`} key={product?.id}>
            <div className="flex flex-col p-4 rounded-xl border gap-4 transition hover:bg-slate-50">
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
          ))}
        </div>
    </section>
  )
}

export default WomenPage