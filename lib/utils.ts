import { Product, ShoppingCart, ShoppingCartItem } from "@prisma/client";
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

export interface CartItemsProps {
  cart: ShoppingCart &{
    items: (ShoppingCartItem & {product: Product})[]
    quantity?: number;
    totalPrice?: number
  };
}

export interface CartWithProducts extends ShoppingCart {
  items: (ShoppingCartItem & {product: Product})[];
  quantity?: number;
  totalPrice?: number;
}
