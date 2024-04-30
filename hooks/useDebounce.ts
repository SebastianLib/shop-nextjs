import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export const useDebounce = (value:string) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value)
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const pathname = usePathname();
    let searchTimeout:ReturnType<typeof setTimeout>
    const router = useRouter();

    useEffect(()=>{

        searchTimeout = setTimeout(() => {
            if (value) {
              params.set("search", value);
            } else {
              params.delete("search");
            }
            if (value === "all") {
              params.delete("search");
            }
            router.push(`${pathname}?${params.toString()}`);
          }, 300);
          return () => clearTimeout(searchTimeout)
    },[value])

    return debouncedValue;
}