import Pagination from "@/components/shared/Pagination";
import SingleItem from "@/components/shared/SingleItem";
import { ProductParams, getAllProducts } from "@/lib/db/product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AllProducts = () => {
  const [products, setProducts] = useState<ProductParams[]>([]);
  const [totalProductsPages, setTotalProductsPages] = useState<number>(0);
  const [actualPage, setActualPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(4);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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
    const fetchProducts = async () => {
      try {
        const page = searchParams.get("page");
        page ? setActualPage(parseInt(page)) : setActualPage(1)
        const actualPage = page ? parseInt(page) - 1 : 0;
        const productsData = await getAllProducts(actualPage, skip);
        setTotalProductsPages(Math.ceil(productsData?.totalProducts / skip));
        setProducts(productsData?.products);
      } catch (error: any) {
        throw new Error(error);
      }
    };

    fetchProducts();
  }, [searchParams]);
  return (
    <div className="mt-12 w-full flex flex-col gap-4 overflow-x-hidden">
      <h2 className="text-2xl">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    </div>
  );
};

export default AllProducts;
