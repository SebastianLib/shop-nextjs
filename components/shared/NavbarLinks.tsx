"use client";
import { links } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarLinks = () => {
  const pathname = usePathname();
  return (
    <ul className="hidden lg:flex md:gap-4 lg:gap-12 shrink-0">
      {links.map((link) => {
        return (
          <li
            key={link.label}
            className={`text-md lg:text-xl relative before:content-[''] before:w-0 before:h-[2px] before:bg-violet-500 before:absolute 
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
  );
};

export default NavbarLinks;
