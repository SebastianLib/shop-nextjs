"use client";
import React, { useState } from "react";
import { Product, ShoppingCartItem, Size } from "@prisma/client";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PurchasedProduct extends ShoppingCartItem {
  product: Product & {
    size: {
      id: string;
      size: string;
    };
  }&{
    category:{
      id: string;
      name: string;
    }
  }
}

interface PurchasedItemsListComponentProps {
  allItems: PurchasedProduct[];
}

const PurchasedItemsListComponent = ({
  allItems,
}: PurchasedItemsListComponentProps) => {
  const [numberItems, setNumberItems] = useState<number>(4);
  return (
    <div className="md:mt-40 mt-28 container overflow-x-hidden">
      <h1 className="text-center text-4xl font-semibold">Purchased Items</h1>
      <div className="flex flex-col gap-8 border rounded-xl shadow-xl max-w-5xl mx-auto mt-10 mb-12 p-4">
        {allItems.length === 0 && (
          <h2 className="text-2xl text-center">Not items found</h2>
        )}
        {allItems.slice(0, numberItems).map((item) => (
          <div
            key={item.id}
            className="flex xs:flex-col md:flex-row md:justify-between md:items-center gap-2"
          >
            <div className="flex items-center gap-4 w-fit">
              <Image
                src={item.product.image}
                width={150}
                height={150}
                alt={item.product.name}
                priority={true}
                className="rounded-lg overflow-hidden object-cover h-[150px] w-[150px]"
              />
              <div>
                <h2 className="font-bold xs:text-sm sm:text-lg">
                  {item.product.name}
                </h2>
                <p>
                  size:{" "}
                  <span className="font-bold xs:text-sm sm:text-md">
                    {item.product?.size?.size}
                  </span>
                </p>
                <p>
                  quantity:{" "}
                  <span className="font-bold xs:text-sm sm:text-md">
                    {item.quantity}
                  </span>
                </p>
                <p>
                  purchased:{" "}
                  <span className="font-bold xs:text-sm sm:text-md">
                    {format(new Date(item.createdAt!.toString()), "MM/dd/yyyy")}
                  </span>
                </p>
              </div>
            </div>
            <Link
              href={`/${item.product.gender.toLowerCase()}?category=${
                item.product.category.name
              }`}
            >
              <Button variant="main" className="h-12 xs:w-full md:w-fit">
                Find Similar Items
              </Button>
            </Link>
          </div>
        ))}
        {allItems.length > numberItems && (
          <Button
            variant="main"
            onClick={() => setNumberItems((prev) => prev + 4)}
          >
            load more
          </Button>
        )}
      </div>
    </div>
  );
};

export default PurchasedItemsListComponent;
