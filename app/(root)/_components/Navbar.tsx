"use client";
import MobileNavbar from "./MobileNavbar";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, auth, useAuth } from "@clerk/nextjs";
import { Button } from "../../../components/ui/button";
import Basket from "../../../components/shared/Basket";
import Image from "next/image";
import NavbarLinks from "../../../components/shared/NavbarLinks";
import { useShoppingCartContext } from "@/context/shoppingCart";
import { cn } from "@/utils/arrays";

const Navbar = () => {
  const { userId } = useAuth();
  const { cart } = useShoppingCartContext();
  
  return (
    <nav className="fixed top-0 bg-white w-full z-20 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 md:py-8 px-1">
        <div
          className={cn(
            `xs:hidden font-semibold text-2xl sm:text-3xl md:text-4xl`,
            !userId ? "xl:flex" : "lg:flex"
          )}
        >
          <Link href="/">
            <Image height={45} width={45} alt="logo" src="/shoplogo.svg" />
          </Link>
        </div>

        <NavbarLinks />

        <SignedIn>
          <div className="hidden lg:flex items-center gap-4">
            {cart && <Basket cart={cart} />}
            <UserButton />
          </div>
        </SignedIn>

        <SignedOut>
          <div className="hidden lg:flex gap-4 text-black">
            <div className="flex items-center gap-4">
              {cart && <Basket cart={cart} />}
              <div className="hidden lg:flex">
                <UserButton />
              </div>
            </div>
            <Link href="/sign-in">
              <Button
                className="border-violet-600 border-2 text-violet-600 hover:bg-violet-600 hover:text-white "
                variant="outline"
              >
                Log in
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                className="bg-violet-600 text-white hover:bg-white hover:text-violet-600 hover:border-violet-600"
                variant="outline"
              >
                Sign up
              </Button>
            </Link>
          </div>
        </SignedOut>
        <div className="lg:hidden w-full xs:flex xs:justify-between">
          {cart && <Basket cart={cart} />}
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
