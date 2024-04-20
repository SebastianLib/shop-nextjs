"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { changeQuantityCartItem, removeCartItem } from "@/lib/db/cart";
import { formatPrice } from "@/lib/formatPrice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CartWithProducts} from "@/lib/utils";
import { Dispatch, SetStateAction, useRef } from "react";

interface CartProps {
  cart: CartWithProducts,
  isChanging: boolean,
  setIsChanging: Dispatch<SetStateAction<boolean>>;
}

const CartItems = ({ cart, setIsChanging }: CartProps) => {
  const router = useRouter();
  const handleRemove = async (itemId: string) => {
    try {
      setIsChanging(true);
      await removeCartItem(itemId);
      toast.success("You have successfully removed the item from your cart");
      router.refresh();
    } catch (error: any) {
      throw new Error(error);
    }finally{
      setIsChanging(false);
    }
  };

   const handleQuantity = async (quantity: number, id: string) => {
    try {
      setIsChanging(true);
      await changeQuantityCartItem(id, quantity);
      router.refresh();
    } catch (error: any) {
      throw new Error(error);
    }finally{
      setIsChanging(false);
    }
  };


  return (
    <div className="space-y-4">
      {cart!.items.map((item) => {
        const total = item.product.price * item.quantity;
        const quantityRef= useRef<any>(null)
        return (
          <div
            className="flex xs:flex-col items-center justify-between md:flex-row gap-4"
            key={item.product.id}
          >
            <div className="flex xs:flex-col sm:flex-row items-center gap-4 w-fit">
              <Image
                src={item.product.image}
                width={150}
                height={150}
                alt={item.product.name}
                priority={true}
                className="rounded-lg overflow-hidden object-cover max-h-[150px] max-w-[150px]"
              />
              <div className="flex flex-col gap-1">
                <p className="text-xl font-semibold">{item.product.name}</p>
                <p className="flex items-center gap-2">
                  Quantity:
                  <Input
                    onChange={(e) =>{
                      if(quantityRef.current.value <0){
                        quantityRef.current.value = 0            
                      }else{
                        handleQuantity(parseInt(quantityRef.current.value), item.id)
                      }
                      }                        
                    }
                    className="w-16"
                    type="number"
                    defaultValue={item.quantity}
                    ref={quantityRef}
                  />
                </p>
                <p>
                  Price:{" "}
                  <span className="font-semibold">
                    {formatPrice(item.product.price)}
                  </span>
                </p>
                <p>
                  Total Price:{" "}
                  {<span className="font-semibold">{formatPrice(total)}</span>}
                </p>
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
    </div>
  );
};

export default CartItems;