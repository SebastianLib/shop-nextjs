import { paginationPosition } from "@/utils/paginationPosition";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ProductFiltersProps {
  totalProductsPages: number;
}

const Pagination = ({ totalProductsPages }: ProductFiltersProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  let page = searchParams.get("page");
  let actualPage = page ? parseInt(page) : 1;
  const params = new URLSearchParams(searchParams);

  const actualPaginationPosition = paginationPosition({
    actualPage,
    totalProductsPages,
  });

  function handlePage(type: string | null, number?:number) {
    let newPage:number
    if(type === "prev"){
      newPage = actualPage - 1;
    }
    if(type === "next"){
      newPage = actualPage + 1;
    }
    if(type === null){
      newPage = number!
    }
    params.set("page", newPage!.toString());
    router.push(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="flex justify-center my-8 gap-4">
      <button
        onClick={()=>handlePage("prev")}
        disabled={actualPage == 1}
        className={` text-white px-4 ${
          actualPage == 1 ? "bg-violet-400" : "bg-violet-600"
        }`}
      >
        prev
      </button>
      <div className="hidden md:flex gap-2">
        {actualPaginationPosition.map((page, index) => {
          if (!page.value) return null;
          return (
            <div
              key={index}
              onClick={()=>handlePage(null, page.value!)}
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
        <div className="px-6 py-2 text-white cursor-pointer bg-violet-600">
          {actualPage}
        </div>
      </div>
      <button
        onClick={()=>handlePage("next")}
        disabled={actualPage >= totalProductsPages}
        className={` text-white px-4 ${
          actualPage >= totalProductsPages ? "bg-violet-400" : "bg-violet-600"
        }`}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
