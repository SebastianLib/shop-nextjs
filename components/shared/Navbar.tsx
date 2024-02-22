import { CartParams, links } from "@/lib/utils";
import MobileNavbar from "./MobileNavbar";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, auth, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Basket from "./Basket";
import Image from "next/image";
import NavbarLinks from "./NavbarLinks";

const Navbar = ({ cart }: any) => {
  const { userId } = auth();

  return (
    <nav className="fixed bg-white w-full z-20 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 md:py-8 px-1">
        <div
          className={`${
            userId ? "hidden" : "flex"
          } md:flex font-semibold text-2xl sm:text-3xl md:text-4xl`}
        >
          <Link href="/">
            <Image height={130} width={130} alt="logo" src="/logo.svg" />
          </Link>
        </div>
        <NavbarLinks/>
        <SignedIn>
          <div className="flex items-center gap-4">
            {cart && <Basket {...cart} />}
            <div className="hidden md:flex">
              <UserButton />
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="hidden md:flex gap-4 text-black">
            <Link href="/sign-in">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="outline">Sign up</Button>
            </Link>
          </div>
        </SignedOut>
        <div className="md:hidden">
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
