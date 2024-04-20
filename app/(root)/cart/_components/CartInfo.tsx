"use client"
import { CartItemsProps } from "@/lib/utils"
import CartItems from "./CartItems"
import CartSummary from "./CartSummary"
import { useState } from "react"

const CartInfo = ({cart}:CartItemsProps) => {
  const [isChanging, setIsChanging] = useState<boolean>(false)
  
  return (
    <div className="flex flex-col gap-4">
    <CartItems cart={cart} isChanging={isChanging} setIsChanging={setIsChanging}/>
    <CartSummary cart={cart} isChanging={isChanging}/>
  </div>
  )
}

export default CartInfo