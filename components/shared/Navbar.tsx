"use client";
import { links } from "@/lib/utils";
import MobileNavbar from "./MobileNavbar";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { ShoppingBasket } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="fixed bg-white w-full z-20 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 md:py-8 px-1">
        <h1
          className={`${
            userId ? "hidden" : "flex"
          } sm:flex font-semibold text-2xl sm:text-3xl md:text-4xl`}
        >
          Shop
        </h1>
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
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                <ShoppingBasket className="w-8 h-8 hover:text-violet-600 transition"/>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-4 flex flex-col">
                <DropdownMenuLabel className="text-md">
                  <h2>1 Items</h2>
                  <p>Subtotal 35$</p>
                </DropdownMenuLabel>
                <DropdownMenuItem className="focus:bg-transparent">
                  <Link href="/cart">
                  <Button variant="main" className="cursor-pointer">View Cart</Button>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden sm:flex">
            <UserButton/>
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
