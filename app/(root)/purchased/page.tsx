import { getPurchasedItems } from "@/lib/db/purchased-items";
import { auth } from "@clerk/nextjs";
import { Product, ShoppingCartItem, Size } from "@prisma/client";
import { redirect } from "next/navigation";
import PurchasedItemsList from "./_components/PurchasedItemsList";

interface PurchasedProduct extends ShoppingCartItem {
  product: Product &{
    size: Size
  };
}

const PurchasedPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const purchasedItems = await getPurchasedItems(userId!);

  const allItems = purchasedItems!.reduce((accumulator, obj) => {
    return accumulator.concat(obj.items as PurchasedProduct[]);
  }, [] as PurchasedProduct[]);
  return (
      <PurchasedItemsList allItems={allItems} />
  );
};

export default PurchasedPage;
