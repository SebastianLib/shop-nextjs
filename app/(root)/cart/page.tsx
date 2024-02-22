import { Button } from "@/components/ui/button";
import { getCart } from "@/lib/db/cart";
import { auth } from "@clerk/nextjs";
import CartItems from "./_components/CartItems";
import { redirect } from "next/navigation";
import CartSummary from "./_components/CartSummary";
import Link from "next/link";

const CartPage = async () => {
  const { userId } = auth();
  if (!userId) redirect("/");
  const cart = await getCart(userId!);

  return (
    <section className="md:mt-40 mt-28 container overflow-x-hidden">
      <h1 className="text-center text-5xl font-semibold">Shopping Cart</h1>
      <div className="border rounded-xl shadow-xl max-w-5xl mx-auto mt-10 mb-12 p-4">
        {cart!.items.length < 1 ? (
          <div className="flex flex-col justify-center w-full my-6 gap-4">
            <h2 className="text-center text-3xl">Your Cart is empty</h2>
            <Button variant="main" className="w-fit h-12 self-center">
              <Link href="/">Find Something</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <CartItems cart={cart!} />
            <CartSummary cart={cart!} />
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
