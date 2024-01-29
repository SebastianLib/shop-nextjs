"use client"

import { getCart } from "@/lib/db/cart";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react"

interface CartItem{
  id:String
  productId:String
  quantity:Number
  createdAt:Date | null
  updatedAt:Date | null,
}

interface CartParams{
  id:String
  userId:String
  createdAt:Date | null
  updatedAt:Date | null
  items:Array<CartItem>
}

const CartPage = () => {
  const [cart, setCart] = useState<CartParams | null>();
  const {userId} = useAuth();
  console.log(cart);
  
  useEffect(()=>{
    const fetchCart = async() => {
      try {
        if(!userId) throw new Error("missing user Id")
        const productsData = await getCart(userId);
        setCart(productsData);

      } catch (error:any) {
        throw new Error(error)
      }
    };

    fetchCart();
  }, [userId]);


  return (
    <section className="mt-40 container">
        <h1 className="text-center text-5xl font-semibold">My Cart</h1>
        <div>
          {cart?.items.map(item =>(
            <div>
              item
            </div>
          ))}
        </div>
    </section>
  )
}

export default CartPage