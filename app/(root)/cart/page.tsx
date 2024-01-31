"use client";
import { Button } from "@/components/ui/button";
import { getCart, removeCartItem } from "@/lib/db/cart";
import { CartParams } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cart, setCart] = useState<CartParams | null>();
  const { userId } = useAuth();
  const router = useRouter();

  const handleRemove = async (itemId:string) => {
    try {
      await removeCartItem(itemId)
      toast.success("You have successfully removed the item from your cart")
      // fetchCart();
    } catch (error:any) {
      throw new Error(error)
    }
  }
  const fetchCart = async () => {
    try {
      if (!userId) throw new Error("missing user Id");
      const productsData = await getCart(userId);
      setCart(productsData);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {

    fetchCart();
  }, [userId]);

  return (
    <section className="mt-40 container overflow-x-hidden">
      <h1 className="text-center text-5xl font-semibold">Shopping Cart</h1>
      <div className="flex flex-col gap-4 border rounded-xl shadow-xl max-w-5xl mx-auto mt-10 mb-12 p-4">
        {cart?.items.map((item) => {
          const total = item.product.price * item.quantity;
          return (
            <div className="flex items-center justify-between" key={item.product.id}>
              <div className="flex items-center gap-4">
              <Image
                src={item.product.image}
                width={150}
                height={150}
                alt={item.product.name}
                className="rounded-lg overflow-hidden object-cover max-h-[150px]"
              />
              <div className="flex flex-col">
                <p className="text-xl font-semibold">{item.product.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>
                  Price:{" "}
                  {item.product.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
                <p>
                  Total Price:{" "}
                  {total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              </div>
              <div>
                <Button variant="destructive" className="h-12" onClick={()=>handleRemove(item.id)}>Remove</Button>
              </div>
            </div>
          );
        })}
        <h2 className="text-center text-2xl font-semibold">
          Total:{" "}
          {cart?.totalPrice.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </h2>
        <Button variant="main" className="h-14">
          Checkout
        </Button>
      </div>
    </section>
  );
};

export default CartPage;
