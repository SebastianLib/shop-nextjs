"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { getCategories } from "@/lib/db/category";
import { CategoryProps } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ProductsFilters = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  let searchTimeout:ReturnType<typeof setTimeout>

  const handleSearchParams= (name:string, term:string) => {

    clearTimeout(searchTimeout);
  
    if (term) {
      params.set(name, term);
    } else {
      params.delete(name);
    }
  
    if (term === "all") {
      params.delete(name);
    }

    searchTimeout = setTimeout(() => {
      replace(`${pathname}?${params.toString()}`);
    }, 200);
  };

  const [categories, setCategories] = useState<CategoryProps[]>();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error: any) {
        throw new Error(error);
      }
    };
    fetchCategories();
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
        <Select
          onValueChange={(value) => handleSearchParams("category", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categories?.map((item) => (
              <SelectItem key={item.id} value={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleSearchParams("sort", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">
              <span className="font-semibold">price:</span> asc
            </SelectItem>
            <SelectItem value="desc">
              <span className="font-semibold">price:</span> desc
            </SelectItem>
            <SelectItem value="latest">latest</SelectItem>
            <SelectItem value="oldest">oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductsFilters;
