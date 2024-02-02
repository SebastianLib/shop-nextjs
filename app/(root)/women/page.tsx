"use client";
import SingleItem from "@/components/shared/SingleItem";
import { Input } from "@/components/ui/input";
import { ProductParams, getProducts } from "@/lib/db/product";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryProps } from "@/lib/utils";
import { getCategories } from "@/lib/db/category";

const WomenPage = () => {
  const [products, setProducts] = useState<ProductParams[]>();
  const [categories, setCategories] = useState<CategoryProps[]>();
  const [loading, setLoading] = useState<boolean>(true);
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSerachParams(name:string,term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(name, term);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const fetchWomenProducts = async () => {
      try {
        const search = (searchParams.get("search"))
        const category = (searchParams.get("category"))
        const params = {search, category}
        
        const productsData = await getProducts("Women", params);
        setProducts(productsData?.products);
      } catch (error: any) {
        throw new Error(error);
      }
    };
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData?.categories);
        setLoading(false);
      } catch (error: any) {
        throw new Error(error);
      }
    };
    
    fetchWomenProducts();
    fetchCategories();
  }, [searchParams]);

  return (
    <section className="mt-40 container">
      <h1 className="text-5xl font-semibold text-center">All Products</h1>
      <div className="grid grid-cols-2 border border-gray-100 px-4 py-8 rounded-xl shadow-xl gap-4">
        <Input
          onChange={(e) => handleSerachParams("search",e.target.value)}
          type="text"
          placeholder="Search"
        />

        <Select onValueChange={(value)=>handleSerachParams("category",value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map(item =>(
              <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {products?.map((product) => (
          <SingleItem key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default WomenPage;
