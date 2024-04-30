import { links } from "@/utils/arrays";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t-2">

      <div className="container p-4 md:py-8">
     <div className="flex xs:flex-col md:flex-row gap-4 items-center xs:justify-between ">
        <Link href="/">
        <Image height={45} width={45} alt="logo" src="/shoplogo.svg" />
      </Link>
          <ul className="flex justify-center text-lg flex-wrap xs:gap-4 lg:gap-8 cursor-pointer">
          {links.map(item =>(
            <Link href={item.href} key={item.href}>
              <li className="navLi">{item.label}</li>
            </Link>
          ))}
        </ul>
    </div>
        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 ShopNextjs™. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
