"use client";
import { getAllProducts, getLatestProducts } from "@/lib/db/product";
import { Product } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/shared/LoadingComponent";
import Choice from "./_components/Choice";
import LatestProducts from "./_components/LatestProducts";
import AllProducts from "./_components/AllProducts";
import PageLayout from "@/components/shared/PageLayout";
import useFetchProducts from "@/hooks/useFetchProduct";

const HomePage = () => {
  const [latestProducts, setLatestProducts] = useState<Product[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const { products, totalProductsPages } = useFetchProducts();
    
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getLatestProducts();
        setLatestProducts(data);
      } catch (error: any) {
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <PageLayout>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl lg:text-4xl font-semibold text-center">
          What are you looking for?
        </h1>
        <Choice />
        <LatestProducts products={latestProducts!} />
        <AllProducts
          products={products!}
          totalProductsPages={totalProductsPages}
        />
      </div>
    </PageLayout>
  );
};

export default HomePage;