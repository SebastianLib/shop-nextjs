"use client";
import { CartParams, links } from "@/lib/utils";
import MobileNavbar from "./MobileNavbar";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import Basket from "./Basket";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";

const Navbar = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  // const [cart, setCart] = useState<CartParams>();
  const [loading, setLoading] = useState<boolean>(true);
  const { cart, getClientCart } = useContext(CartContext);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!userId) return setLoading(false);
        await getClientCart();

        // const productsData = await getCart(userId);
        // setCart(productsData);
        setLoading(false);
      } catch (error: any) {
        throw new Error(error);
      }
    };

    fetchCart();
  }, []);
  return (
    <nav className="fixed bg-white w-full z-20 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 md:py-8 px-1">
        
        <Link href="/">
        <div
          className={`${
            userId ? "hidden" : "flex"
          } sm:flex font-semibold text-2xl sm:text-3xl md:text-4xl`}
        >
          <Image height={130} width={130} alt="logo" src="/logo.svg" />
        </div>
        </Link>
        <ul className="hidden sm:flex  gap-8 md:gap-12 shrink-0">
          {links.map((link) => {
            return (
              <li
                key={link.label}
                className={`sm:text-md md:text-xl relative before:content-[''] before:w-0 before:h-[2px] before:bg-violet-500 before:absolute 
                before:-bottom-2 hover:before:w-full before:left-[50%] hover:before:left-0 before:transition-all ${
                  pathname == link.href && "text-violet-600 "
                }`}
              >
                <Link
                  className={`${pathname == link.href && "text-violet-600"}`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <SignedIn>
          <div className="flex items-center gap-4">
            {cart && <Basket {...cart} />}
            <div className="hidden sm:flex">
              <UserButton />
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="hidden sm:flex gap-4 text-black">
            <Link href="/sign-in">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="outline">Sign up</Button>
            </Link>
          </div>
        </SignedOut>
        <div className="sm:hidden">
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
