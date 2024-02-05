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
];

export const gender = [
  { name: "Men"},
  { name: "Women",},
  { name: "Both",},
];

export interface CategoryProps {
  id: string;
  name: string;
}

export interface CartParams{
  id:string
  userId:string
  createdAt:Date | null
  updatedAt:Date | null
  items:Array<CartItem>
  quantity:number
  totalPrice:number
}

export interface CartItem{
  id:string
  productId:string
  product: Product
  quantity:number
  createdAt:Date | null
  updatedAt:Date | null,
}

export interface Product{
  id: string,
  userId: string,
  name: string,
  categoryName: string,
  image: string,
  description: string,
  price: number,
  gender: string,
  createdAt:Date | null
  updatedAt:Date | null,
}