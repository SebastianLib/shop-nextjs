import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedIn, SignedOut, UserButton,useAuth } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { links } from "@/constants/links";

const MobileNavbar = () => {
  
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="w-10 h-10" />
      </SheetTrigger>
      <SheetContent>
        <ul className="flex flex-col gap-y-8 cursor-pointer m-2">
          {links.map((item) => (
            <SheetClose asChild key={item.href}>
              <li className="text-2xl">
                <Link href={item.href}>
                  {item.label}
                </Link>
              </li>
            </SheetClose>
          ))}
        </ul>
        <div className="flex mx-2 my-8 gap-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="flex gap-4">
              <Link href="/sign-in">
                <Button className="bg-violet-600 text-white hover:bg-violet-500">Log in</Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-violet-600 text-white hover:bg-violet-500">Sign up</Button>
              </Link>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
