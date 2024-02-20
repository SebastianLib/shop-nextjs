"use client";
import SingleItem from "@/components/shared/SingleItem";
import { ProductParams, getProducts } from "@/lib/db/product";
import {
  usePathname,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import ProductsFilters from "@/components/shared/ProductsFilters";
import Loading from "@/components/shared/Loading";
import Pagination from "@/components/shared/Pagination";

const MenPage = () => {
  const [products, setProducts] = useState<ProductParams[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const [totalProductsPages, setTotalProductsPages] = useState<number>(0);
  const [actualPage, setActualPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(4);

  const searchParams = useSearchParams();
  const pathname = usePathname();


  useEffect(() => {
    const fetchMenProducts = async () => {
      try {
        setLoading(true)
        const search = searchParams.get("search");
        const category = searchParams.get("category");
        const sort = searchParams.get("sort");
        const params = { search, category, sort };
  
  
        const page = searchParams.get("page");
        page ? setActualPage(parseInt(page)) : setActualPage(1)
        const actualPage = page ? parseInt(page) - 1 : 0;
  
        const productsData = await getProducts({gender:"Men", params, actualPage, skip});
  
        setTotalProductsPages(Math.ceil(productsData?.totalProducts / skip));
        setProducts(productsData?.products);
      } catch (error: any) {
        throw new Error(error);
      }finally{
        setLoading(false)
      }
    };

    fetchMenProducts();
  }, [searchParams]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="md:mt-40 mt-28 container">
      {/* <h1 className="text-5xl font-semibold text-center">All Products</h1> */}
      <ProductsFilters/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {products?.map((product) => (
          <SingleItem key={product.id} {...product} />
        ))}
      </div>
      <Pagination 
          actualPage={actualPage} 
          totalProductsPages={totalProductsPages} 
          />
    </section>
  );
};

export default MenPage;
