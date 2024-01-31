import { ShoppingBasket } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { getCart } from "@/lib/db/cart";
import { CartParams } from "@/lib/utils";

const Basket = () => {
  const [cart, setCart] = useState<CartParams | null>();
  const { userId } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!userId) throw new Error("missing user Id");
        const productsData = await getCart(userId);
        setCart(productsData);
      } catch (error: any) {
        throw new Error(error);
      }
    };

    fetchCart();
  }, [userId]);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative">
        <ShoppingBasket className="w-8 h-8 hover:text-violet-600 transition" />
        <div className="absolute border border-black rounded-full -top-3 -right-3 w-5 h-5 flex items-center justify-center">
        <p className="text-sm">{cart?.quantity}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 flex flex-col">
        <DropdownMenuLabel className="text-md">
          <h2>Items: {cart?.quantity}</h2>
          <p>
            Subtotal{" "}
            {cart?.totalPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuItem className="focus:bg-transparent">
          <Link href="/cart">
            <Button variant="main" className="cursor-pointer">
              View Cart
            </Button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Basket;