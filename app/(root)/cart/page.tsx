"use client";
import { Button } from "@/components/ui/button";
import { changeQuantityCartItem, getCart, removeCartItem } from "@/lib/db/cart";
import { CartParams } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import Loading from "@/components/shared/Loading";
import { formatPrice } from "@/lib/formatPrice";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState<CartParams | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const { userId } = useAuth();

  const handleRemove = async (itemId: string) => {
    try {
      await removeCartItem(itemId);
      toast.success("You have successfully removed the item from your cart");
      fetchCart();
    } catch (error: any) {
      throw new Error(error);
    }
  };
  const fetchCart = async () => {
    try {
      if (!userId) throw new Error("missing cart Id");
      const productsData = await getCart(userId);
      setCart(productsData);
    } catch (error: any) {
      throw new Error(error);
    }
    setLoading(false);
  };

  const handleQuantity = async (quantity: number, id: string) => {
    try {
      await changeQuantityCartItem(id, quantity);
      fetchCart();
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post("/api/products", {
        cart: cart,
      });

      window.location.assign(response.data.url)
    } catch (error) {
      toast.error("Something went wrong")
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="md:mt-40 mt-28 container overflow-x-hidden">
      <h1 className="text-center text-5xl font-semibold">Shopping Cart</h1>
      <div className="flex flex-col gap-4 border rounded-xl shadow-xl max-w-5xl mx-auto mt-10 mb-12 p-4">
        {cart?.items.map((item) => {
          const total = item.product.price * item.quantity;
          return (
            <div
              className="flex xs:flex-col items-center justify-between md:flex-row gap-4"
              key={item.product.id}
            >
              <div className="flex items-center gap-4 w-fit">
                <Image
                  src={item.product.image}
                  width={150}
                  height={150}
                  alt={item.product.name}
                  priority={true}
                  className="rounded-lg overflow-hidden object-cover max-h-[150px] max-w-[150px]"
                />
                <div className="flex flex-col">
                  <p className="text-xl font-semibold">{item.product.name}</p>
                  <p className="flex items-center gap-2">
                    Quantity:
                    <Input
                      onChange={(e) =>
                        handleQuantity(parseInt(e.target.value), item.id)
                      }
                      className="w-16"
                      type="number"
                      defaultValue={item.quantity}
                    />
                  </p>
                  <p>Price:{formatPrice(item.product.price)}</p>
                  <p>Total Price: {formatPrice(total)}</p>
                </div>
              </div>

              <div className="xs:w-full md:w-fit flex justify-end">
                <Button
                  variant="destructive"
                  className="h-12 xs:w-full md:w-24"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          );
        })}
        <h2 className="text-center text-2xl font-semibold mt-4">
          Total: {cart?.totalPrice ? formatPrice(cart?.totalPrice) : "$0,00"}
        </h2>
        <Button onClick={handleCheckout} variant="main" className="h-14">
          Checkout
        </Button>
      </div>
    </section>
  );
};

export default CartPage;
