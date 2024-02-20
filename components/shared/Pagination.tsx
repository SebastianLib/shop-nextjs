import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";

interface ProductFiltersProps {
    actualPage: number,
    totalProductsPages: number,
  }

const Pagination = ({actualPage, totalProductsPages}:ProductFiltersProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
    const numberOfItems = 3;
    const arrayOfObjects = [];
    const { replace } = useRouter();
    if (actualPage && totalProductsPages) {
      for (let i = 0; i < numberOfItems; i++) {
        if (
          (actualPage === 1 && i === 0) ||
          i + (actualPage - 1) > totalProductsPages
        ) {
          arrayOfObjects.push({ value: null });
        } else {
          arrayOfObjects.push({ value: i + (actualPage - 1) });
        }
      }
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
    
  return (
    <div className="flex justify-center my-4 gap-4">
        <button
          onClick={handlePrevPage}
          disabled={actualPage == 1}
          className={` text-white px-4 ${
            actualPage == 1 ? "bg-violet-400" : "bg-violet-600"
          }`}
        >
          prev
        </button>
        <div className="hidden md:flex gap-2">
          {arrayOfObjects.map((page, index) => {
            if (!page.value) return null;
            return (
              <div
                key={index}
                onClick={()=>handlePage(page.value)}
                className={`px-6 py-2 text-white cursor-pointer ${
                  page.value === actualPage ? "bg-violet-600" : "bg-violet-400"
                }`}
              >
                {page.value}
              </div>
            );
          })}
        </div>
        <div className="xs:flex md:hidden">
          <div
            className="px-6 py-2 text-white cursor-pointer bg-violet-600"
          >
            {actualPage}
          </div>
        </div>
        <button
          onClick={handleNextPage}
          disabled={actualPage >= totalProductsPages}
          className={` text-white px-4 ${
            actualPage >= totalProductsPages ? "bg-violet-400" : "bg-violet-600"
          }`}
        >
          next
        </button>
      </div>
  )
}

export default Pagination