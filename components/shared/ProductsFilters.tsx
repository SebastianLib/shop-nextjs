"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams} from "next/navigation";
import { Category, Size } from "@prisma/client";
import SingleFilter from "./SingleFilter";
import { useDebounce } from "@/hooks/useDebounce";
import { otherFilters } from "@/constants/otherFilters";

interface ProductFiltersProps{
  categories: Category[],
  sizes: Size[],
}

const ProductsFilters = ({categories, sizes}:ProductFiltersProps) => {
  const [search, setSearch] = useState<string>("")
  const router = useRouter();
  useDebounce(search)
  
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const pathname = usePathname();

  const handleSearchParams= (name:string, value:string) => {
    
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      if (value === "all") {
        params.delete(name);
      }
      router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-100 px-4 py-8 rounded-xl shadow-xl gap-4 -mt-6">
      <Input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search"
        defaultValue={params.get("search") || ""}
      />

      <div className="flex xs:justify-center md:justify-end gap-4">
        <SingleFilter data={categories!} type="category" handleSearchParams={handleSearchParams}/>
        <SingleFilter data={sizes!} type="size" handleSearchParams={handleSearchParams}/>
        <SingleFilter data={otherFilters!} type="sort" handleSearchParams={handleSearchParams}/>

      </div>
    </div>
  );
};

export default ProductsFilters;
