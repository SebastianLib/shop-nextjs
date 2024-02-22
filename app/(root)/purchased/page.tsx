import { getPurchasedItems } from "@/lib/db/purchased-items";
import { auth } from "@clerk/nextjs";
import { Product, ShoppingCartItem } from "@prisma/client";
import { redirect } from "next/navigation";
import PurchasedItemsList from "./_components/PurchasedItemsList";

interface PurchasedProduct extends ShoppingCartItem {
  product: Product;
}

const PurchasedPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const purchasedItems = await getPurchasedItems(userId!);

  const allItems = purchasedItems!.reduce((accumulator, obj) => {
    return accumulator.concat(obj.items);
  }, [] as PurchasedProduct[]);

  return (
    <div>
      <PurchasedItemsList allItems={allItems} />
    </div>
  );
};

export default PurchasedPage;
