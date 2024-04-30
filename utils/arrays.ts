import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const links = [
  { label: "Home", href: "/" },
  { label: "Women", href: "/women" },
  { label: "Men", href: "/men" },
  { label: "Add Product", href: "/create" },
  { label: "Purchased Items", href: "/purchased" },
];

export const gender = [
  { name: "Men"},
  { name: "Women",},
  { name: "Both",},
];

export interface OtherFiltersProps{
  id: number,
  name: string,
  value: string 
}

export const otherFilters = [
  {id:1, name: "asc", value:"asc"},
  {id:2, name: "desc", value:"desc"},
  {id:3, name: "latest", value:"latest"},
  {id:4, name: "oldest", value:"oldest"},
];
