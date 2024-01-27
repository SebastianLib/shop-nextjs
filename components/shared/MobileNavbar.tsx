import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedIn, SignedOut, UserButton,useAuth } from "@clerk/nextjs";
import { links } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const MobileNavbar = () => {
  const {userId} = useAuth()
  
  return (
    <Sheet>
      <SheetTrigger className="sm:hidden">
        <Menu className="w-10 h-10" />
      </SheetTrigger>
      <SheetContent>
        <ul className="flex flex-col gap-y-8 cursor-pointer m-4">
          {links.map((item) => (
            <SheetClose asChild key={item.href}>
              <li className="text-3xl">
                <Link href={item.href}>
                  {item.label}
                </Link>
              </li>
            </SheetClose>
          ))}
          {userId && (
            <SheetClose asChild>
              <li className="text-3xl">
                <Link href="create">Add Product</Link>
              </li>
            </SheetClose>
          )}
        </ul>
        <div className="flex mx-4 my-8 gap-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="text-black">
              <Link href="/sign-in">
                <Button>Log in</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Sign up</Button>
              </Link>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
