"use client";
import SingleItem from "@/components/shared/SingleItem";
import { getProducts } from "@/lib/db/product";
import {useSearchParams } from "next/navigation";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import ProductsFilters from "@/components/shared/ProductsFilters";
import Loading from "@/components/shared/LoadingComponent";
import Pagination from "@/components/shared/Pagination";
import { useFilterParams } from "@/hooks/useFilterParams";

const MenPage = () => {
  const [products, setProducts] = useState<Product[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const [totalProductsPages, setTotalProductsPages] = useState<number>(0);
  let skip = 4;
  const searchParams = useSearchParams();
  
  useEffect(() => {
    
    const fetchMenProducts = async () => {
      try {
        setLoading(true);
       const params = useFilterParams({searchParams})

        const page = searchParams.get("page");
        const actualPage = page ? parseInt(page) - 1 : 0;
        const productsData = await getProducts({
          gender: "Men",
          params,
          actualPage,
          skip,
        });

        setTotalProductsPages(Math.ceil(productsData?.totalProducts / skip));
        setProducts(productsData?.products);
      } catch (error: any) {
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenProducts();
  }, [searchParams]);

  if (loading) {
    return <section className="md:mt-40 mt-28 container min-h-screen">
    <ProductsFilters />
    <Loading/>
  </section>
  }

  return (
    <section className="md:mt-40 mt-28 container min-h-screen">
      <ProductsFilters />
      {products!.length == 0 && (
        <h2 className="text-center text-2xl mt-10">No products found</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {products?.map((product) => (
          <SingleItem key={product.id} {...product} />
        ))}
      </div>
      {products!.length !== 0 && (
        <Pagination totalProductsPages={totalProductsPages} />
      )}
    </section>
  );
};

export default MenPage;
