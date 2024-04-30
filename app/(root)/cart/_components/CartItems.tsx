"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import { useShoppingCartContext } from "@/context/shoppingCart";


const CartItems = () => {
  const {changeQuantity, removeProduct, cart} = useShoppingCartContext();

   const handleQuantity = async (quantity: number, id: string) => {    
    
    if(isNaN(quantity) || quantity < 0){
      changeQuantity({quantity:0, id});
    }else{
      changeQuantity({quantity, id});
    }

  };
  return (
    <div className="space-y-4">
      {cart?.items?.map((item) => {
        const total = item.product.price * item.quantity;
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
                    onChange={e => handleQuantity(parseInt(e.target.value), item.productId)}
                    className="w-16"
                    type="number"
                    defaultValue={item.quantity}
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
                onClick={() =>removeProduct(item.productId)}
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