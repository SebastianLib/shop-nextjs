"use client";
import { Button } from "@/components/ui/button";
import { useShoppingCartContext } from "@/context/shoppingCart";
import { createNewCart } from "@/lib/db/cart";
import { formatPrice } from "@/utils/formatPrice";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const CartSummary = () => {
  const { cart, setCart } = useShoppingCartContext();
  const { userId } = useAuth();
  const router= useRouter()
  const [loadingStripe, setLoadingStripe] = useState<boolean>(false);
  const handleCheckout = async () => {
    try {
      const dbCart = await createNewCart(cart);
      setLoadingStripe(true);

      const response = await axios.post("/api/products", {
        cart: dbCart,
      });
      setCart({
        userId: userId || null,
        items: [],
        quantity: 0,
        totalPrice: 0,
        sold: false,
      })
      router.push(response.data.url);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoadingStripe(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-center text-2xl font-semibold mt-4">
        Total: {cart?.totalPrice ? formatPrice(cart?.totalPrice) : "$0,00"}
      </h2>
      {userId ? (
        <Button
          disabled={loadingStripe || cart?.totalPrice === 0}
          onClick={handleCheckout}
          variant="main"
          className="h-14 w-full disabled:bg-violet-600/50 text-lg md:text-xl"
        >
          Checkout
        </Button>
      ) : (
        <Link href="/sign-in">
        <Button
        className="h-14 mt-2 w-full disabled:bg-violet-600/50 text-lg md:text-xl"
        variant="main"
        >
          Login to buy products
        </Button>
        </Link>
      )}
    </div>
  );
};

export default CartSummary;
