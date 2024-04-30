"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Product, Size } from "@prisma/client";
import { countQuantityAndPrice } from "@/utils/countQuantityAndPrice";
import { useInitializeCart } from "@/hooks/useInitializeCart";
import { CartProps } from "@/utils/types";

interface ChangeQuantityProps {
  quantity: number;
  id: string;
}

interface ShoppingCartProps {
  cart: CartProps;
  setCart: React.Dispatch<React.SetStateAction<CartProps>>
  addProduct: (product: Product) => void;
  changeQuantity: ({ quantity, id }: ChangeQuantityProps) => void;
  removeProduct: (itemId: string) => void;
}

const ShoppingCart = createContext<ShoppingCartProps>({
  cart: { userId: null, items: [], quantity: 0, totalPrice: 0, sold: false },
  setCart: () => {},
  addProduct: (product: Product) => {},
  changeQuantity: ({ quantity, id }: ChangeQuantityProps) => {},
  removeProduct: (itemId: string) => {},
});

export function ShoppingCartWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = useAuth();
  const [cart, setCart] = useState<CartProps>(() => {
    return useInitializeCart(userId)
  });
  
  const addProduct = (product: Product) => {
    if (!cart) return;
    const existingProductIndex = cart.items?.findIndex(
      (item: { product: Product; productId: string; quantity: number }) =>
        item.productId === product.id
    );
    const prevCart = cart as CartProps;
    if (existingProductIndex !== -1) {
      prevCart!.items[existingProductIndex].quantity += 1;
    } else {
      prevCart.items.push({
        productId: product.id,
        product: product,
        quantity: 1,
      });
    }

    const { totalQuantity, totalPrice } = countQuantityAndPrice(cart);
    setCart({ ...prevCart, quantity: totalQuantity, totalPrice: totalPrice });
  };

  const changeQuantity = ({ quantity, id }: ChangeQuantityProps) => {
    if (!cart) return;
    const prevCart = cart;
    const findIndex = prevCart?.items?.findIndex(
      (item: any) => item.productId === id
    );
    prevCart!.items[findIndex].quantity = quantity;
    const { totalQuantity, totalPrice } = countQuantityAndPrice(prevCart);

    setCart({ ...prevCart, quantity: totalQuantity, totalPrice: totalPrice });
  };

  const removeProduct = (itemId: string) => {
    if (!cart) return;
    const prevCart = cart;
    prevCart!.items = prevCart?.items?.filter(
      (item: any) => item.productId !== itemId
    );
    const { totalQuantity, totalPrice } = countQuantityAndPrice(prevCart);
    setCart({ ...prevCart, quantity: totalQuantity, totalPrice: totalPrice });
  };
  
  useEffect(() => {
    const saveCartToLocalStorage = () => {
      if (cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    };
  
    saveCartToLocalStorage();
  }, [cart]);

  return (
    <ShoppingCart.Provider
      value={{
        cart,
        setCart,
        addProduct,
        changeQuantity,
        removeProduct,
      }}
    >
      {children}
    </ShoppingCart.Provider>
  );
}

export function useShoppingCartContext() {
  return useContext(ShoppingCart);
}
