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
import { formatPrice } from "@/lib/formatPrice";
import { CartParams } from "@/lib/utils";

const Basket = (cart: CartParams) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative">
        <ShoppingBasket className="w-8 h-8 hover:text-violet-600 transition" />
        {cart.quantity > 0 && (
          <div className="absolute border border-black rounded-full -top-3 -right-3 w-5 h-5 flex items-center justify-center">
            <p className="text-sm">{cart?.quantity}</p>
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 flex flex-col">
        <DropdownMenuLabel className="text-md">
          <h2>Items: {cart?.quantity}</h2>
          <p>Subtotal {formatPrice(cart?.totalPrice)}</p>
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
