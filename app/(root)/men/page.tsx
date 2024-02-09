"use client";
import SingleItem from "@/components/shared/SingleItem";
import { ProductParams, getProducts } from "@/lib/db/product";
import {
  usePathname,
  useRouter,
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
  const { replace } = useRouter();

  function handleSearchParams(name: string, term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(name, term);
    } else {
      params.delete(name);
    }
    if(term === "all"){
      params.delete(name)
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function handleNextPage() {
    const params = new URLSearchParams(searchParams);
    const page = actualPage + 1;
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  }

  function handlePrevPage() {
    const params = new URLSearchParams(searchParams);
    const page = actualPage - 1;
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  }
  const handlePage = (page:number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const fetchMenProducts = async () => {
      try {
        const search = searchParams.get("search");
        const category = searchParams.get("category");
        const sort = searchParams.get("sort");
        const params = { search, category, sort };


        const page = searchParams.get("page");
        page ? setActualPage(parseInt(page)) : setActualPage(1)
        const actualPage = page ? parseInt(page) - 1 : 0;

        const productsData = await getProducts("Men", params, actualPage, skip);

        setTotalProductsPages(Math.ceil(productsData?.totalProducts / skip));
        setProducts(productsData?.products);
      } catch (error: any) {
        throw new Error(error);
      }
      setLoading(false)
    };

    fetchMenProducts();
  }, [searchParams]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="md:mt-40 mt-28 container">
      {/* <h1 className="text-5xl font-semibold text-center">All Products</h1> */}
      <ProductsFilters handleSearchParams={handleSearchParams}/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {products?.map((product) => (
          <SingleItem key={product.id} {...product} />
        ))}
      </div>
      <Pagination 
          actualPage={actualPage} 
          handlePrevPage={handlePrevPage} 
          handleNextPage={handleNextPage}
          handlePage={handlePage}
          totalProductsPages={totalProductsPages} 
          />
    </section>
  );
};

export default MenPage;
