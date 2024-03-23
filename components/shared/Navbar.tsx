import { CartParams } from "@/lib/utils";
import MobileNavbar from "./MobileNavbar";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, auth,} from "@clerk/nextjs";
import { Button } from "../ui/button";
import Basket from "./Basket";
import Image from "next/image";
import NavbarLinks from "./NavbarLinks";
import { getCart } from "@/lib/db/cart";
import { setCookie, getCookie } from 'cookies-next';

const Navbar = async() => {
  const { userId } = auth();
  
  const cart = await getCart(userId!);
  
  return (
    <nav className="fixed bg-white w-full z-20 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 md:py-8 px-1">
        <div
          className={`${
            userId ? "hidden" : "flex"
          } md:flex font-semibold text-2xl sm:text-3xl md:text-4xl`}
        >
          <Link href="/">
            <Image height={45} width={45} alt="logo" src="/shoplogo.svg" />
          </Link>
        </div>
        <NavbarLinks />
        <SignedIn>
          <div className="flex items-center gap-4">
            {cart && <Basket {...cart} />}
            <div className="hidden lg:flex">
              <UserButton />
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="hidden lg:flex gap-4 text-black">
          {cart && <Basket {...cart} />}
            <Link href="/sign-in">
              <Button
                className="border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white "
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
        <div className="lg:hidden">
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;