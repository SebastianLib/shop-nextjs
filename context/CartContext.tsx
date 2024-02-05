"use client"
import { getCart } from "@/lib/db/cart";
import { CartParams } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import React from "react";
import { createContext, useState } from "react";

interface CartContextParams {
  cart: CartParams;
  getClientCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextParams>({} as CartContextParams);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const { userId } = useAuth();
  const [cart, setCart] = useState<CartParams | undefined>();

  const getClientCart = async () => {
    if(!userId) return
    const newCart = await getCart(userId);
    setCart(newCart);
  };

  return (
    <CartContext.Provider value={{ getClientCart, cart } as CartContextParams}>
      {children}
    </CartContext.Provider>
  );
};