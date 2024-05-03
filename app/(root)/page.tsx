"use client";
import { getAllProducts, getLatestProducts } from "@/lib/db/product";
import { Product, ShoppingCartItem } from "@prisma/client";
import { useEffect, useState } from "react";
import Loading from "@/components/shared/LoadingComponent";
import Choice from "./_components/Choice";
import SwiperProducts from "./_components/SwiperProducts";
import AllProducts from "./_components/AllProducts";
import PageLayout from "@/components/shared/PageLayout";
import useFetchProducts from "@/hooks/useFetchProducts";
import { getBestsellers } from "@/lib/db/purchased-items";

const HomePage = () => {
  const [latestProducts, setLatestProducts] = useState<Product[]>();
  const [bestsellers, setBestsellers] = useState<Product[]>()
  const [loading, setLoading] = useState<boolean>(true);
  const { products, totalProductsPages } = useFetchProducts();
      
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getLatestProducts();
        setLatestProducts(data);
        const products = await getBestsellers();
        setBestsellers(products)
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
        <SwiperProducts products={bestsellers!} text="Bestsellers"/>
        <SwiperProducts products={latestProducts!} text="Latest Products"/>
        <AllProducts
          products={products!}
          totalProductsPages={totalProductsPages}
        />
      </div>
    </PageLayout>
  );
};

export default HomePage;