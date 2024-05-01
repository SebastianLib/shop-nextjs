"use client";
import { Button } from "@/components/ui/button";
import CartSummary from "./_components/CartSummary";
import Link from "next/link";
import CartItems from "./_components/CartItems";
import { useShoppingCartContext } from "@/context/shoppingCart";
import PageLayout from "@/components/shared/PageLayout";

const CartPage = () => {
  const { cart } = useShoppingCartContext();

  return (
    <PageLayout>
      <h1 className="text-center text-5xl font-semibold">Shopping Cart</h1>
      <div className="border rounded-xl shadow-xl max-w-5xl mx-auto mt-10 mb-12 p-4">
        {cart!.items?.length < 1 ? (
          <div className="flex flex-col justify-center w-full my-6 gap-4">
            <h2 className="text-center text-3xl">Your Cart is empty</h2>
            <Button variant="main" className="w-fit h-12 self-center">
              <Link href="/">Find Something</Link>
            </Button>
          </div>
        ) : (
          <>
            <CartItems />
            <CartSummary />
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default CartPage;
