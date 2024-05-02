"use client"
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/db/product";
import { useSearchParams } from "next/navigation";
import { Product } from "@prisma/client";
import { useFilterParams } from "@/hooks/useFilterParams";

const useFetchProducts = (gender?: string) => {
  const [products, setProducts] = useState<Product[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [totalProductsPages, setTotalProductsPages] = useState<number>(0);
  const [skip, setSkip] = useState<number>(4)
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = useFilterParams({ searchParams });

        const page = searchParams.get("page");
        const actualPage = page ? parseInt(page) - 1 : 0;
        const { products,
          totalProducts } = await getProducts({
            gender: gender!,
            params,
            actualPage,
            skip,
          });
          

        setTotalProductsPages(
          Math.ceil(totalProducts / skip)
        );
        setProducts(products);
      } catch (error: any) {
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams, skip]);

  return { products, loading, totalProductsPages };
};

export default useFetchProducts;