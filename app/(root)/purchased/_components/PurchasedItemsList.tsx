import React from "react";
import { Product, ShoppingCartItem } from "@prisma/client";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PurchasedProduct extends ShoppingCartItem {
  product: Product;
}

interface PurchasedItemsListComponentProps {
  allItems: PurchasedProduct[];
}

const PurchasedItemsListComponent = ({
  allItems,
}: PurchasedItemsListComponentProps) => {
  return (
    <div className="md:mt-40 mt-28 container overflow-x-hidden">
      <h1 className="text-center text-5xl font-semibold">Purchased Items</h1>
      <div className="flex flex-col gap-8 border rounded-xl shadow-xl max-w-5xl mx-auto mt-10 mb-12 p-4">
        {allItems.length === 0 && <h2 className="text-2xl text-center">Not items found</h2>}
        {allItems.map((item) => (
          <div key={item.id} className="flex xs:flex-col md:flex-row md:justify-between md:items-center gap-2">
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
                <h2 className="font-bold xs:text-sm sm:text-lg">{item.product.name}</h2>
                <p>
                  quantity: <span className="font-bold xs:text-sm sm:text-md">{item.quantity}</span>
                </p>
                <p>
                  purchased:
                  <span className="font-bold xs:text-sm sm:text-lg">
                    {format(new Date(item.createdAt!.toString()), "MM/dd/yyyy")}
                  </span>
                </p>
              </div>
            </div>
            <Link href={`/${item.product.gender.toLowerCase()}?category=${item.product.categoryName}`}>
            <Button variant="main" className="h-12 xs:w-full md:w-fit">
                Find Similar Items
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchasedItemsListComponent;
