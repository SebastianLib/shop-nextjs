"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { getCategories } from "@/lib/db/category";
import { usePathname, useRouter, useSearchParams} from "next/navigation";
import { getSizes } from "@/lib/db/size";
import { Category, Size } from "@prisma/client";
import SingleFilter from "./SingleFilter";
import { otherFilters } from "@/lib/utils";

const ProductsFilters = () => {
  const [categories, setCategories] = useState<Category[]>();
  const [sizes, setSizes] = useState<Size[]>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const pathname = usePathname();
  let searchTimeout:ReturnType<typeof setTimeout>

  const handleSearchParams= (name:string, value:string) => {
    
    clearTimeout(searchTimeout);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    if (value === "all") {
      params.delete(name);
    }

    searchTimeout = setTimeout(() => {
      router.push(`${pathname}?${params.toString()}`);
    }, 200);
  };

  
  const fetchCategoriesAndSizes = async () => {
    try {
      const categoriesData = await getCategories();
      const sizesData = await getSizes();
      setCategories(categoriesData);
      setSizes(sizesData);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {    
    fetchCategoriesAndSizes();
  }, []);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-100 px-4 py-8 rounded-xl shadow-xl gap-4">
      <Input
        onChange={(e) => handleSearchParams("search", e.target.value)}
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
