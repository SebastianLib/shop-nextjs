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

  function handleNextPage() {
    const page = actualPage + 1;
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  }

  function handlePrevPage() {
    const page = actualPage - 1;
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  }
  const handlePage = (page: number) => {
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

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
        {actualPaginationPosition.map((page, index) => {
          if (!page.value) return null;
          return (
            <div
              key={index}
              onClick={() => handlePage(page.value!)}
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
        onClick={handleNextPage}
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
