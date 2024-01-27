"use client";
import { links } from "@/lib/utils";
import MobileNavbar from "./MobileNavbar";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

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
                className={`sm:text-md md:text-xl ${
                  pathname == link.href && "text-violet-600"
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
          <UserButton />
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
