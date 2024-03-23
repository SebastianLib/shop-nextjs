"use client";
import { getAllProducts, getLatestProducts } from "@/lib/db/product";
import { Product } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/shared/LoadingComponent";
import Choice from "./_components/Choice";
import LatestProducts from "./_components/LatestProducts";
import AllProducts from "./_components/AllProducts";


const HomePage = () => {
  const [allProducts, setAllProducts] = useState<Product[]>();
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [totalProductsPages, setTotalProductsPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [skip, setSkip] = useState<number>(4);

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const page = searchParams.get("page");
        const actualPage = page ? parseInt(page) - 1 : 0;
        const productsData = await getAllProducts(actualPage, skip);
        setTotalProductsPages(Math.ceil(productsData?.totalProducts / skip));
        setLatestProducts(productsData?.products);

        const products = await getLatestProducts();
        setAllProducts(products);
      } catch (error: any) {
        throw new Error(error);
      }finally{
        setLoading(false)
      }
    };

    fetchProducts();
  }, [searchParams]);
  
  if(loading){
    return <Loading/>
  }
  
  return (
    <section className="flex flex-col items-center md:mt-40 mt-28 container">
          <h1 className="text-3xl lg:text-4xl font-semibold text-center">
        What are you looking for?
      </h1>
      <Choice />
      <LatestProducts products={allProducts!}/>
      <AllProducts products={latestProducts} totalProductsPages={totalProductsPages}/>
    </section>
  );
};

export default HomePage;
