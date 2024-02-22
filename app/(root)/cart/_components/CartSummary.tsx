"use client"
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { CartParams } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

interface CartSummaryProps {
  cart: CartParams | null
}

const CartSummary = ({cart}:CartSummaryProps) => {
    const [loadingStripe, setLoadingStripe] = useState<boolean>(false);
    const handleCheckout = async () => {
        try {
          setLoadingStripe(true)
          const response = await axios.post("/api/products", {
            cart: cart,
          });
    
          window.location.assign(response.data.url);
        } catch (error) {
          toast.error("Something went wrong");
        }finally{
          setLoadingStripe(false)
        }
      };

  return (
    <div className="space-y-4">
      <h2 className="text-center text-2xl font-semibold mt-4">
        Total: {cart?.totalPrice ? formatPrice(cart?.totalPrice) : "$0,00"}
      </h2>
      <Button disabled={loadingStripe} onClick={handleCheckout} variant="main" className="h-14 w-full disabled:bg-violet-600/50">
        Checkout
      </Button>
    </div>
  );
};

export default CartSummary;
