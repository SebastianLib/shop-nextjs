import ProductsFilters from "@/components/shared/ProductsFilters";
import Products from "@/components/shared/Products";
import PageLayout from "@/components/shared/PageLayout";
import { getCategories } from "@/lib/db/category";
import { getSizes } from "@/lib/db/size";

const MenPage = async() => {
    const categories = await getCategories();
    const sizes = await getSizes();
  return (
    <PageLayout>
      <ProductsFilters categories={categories} sizes={sizes}/>
      <Products gender="Men" />
    </PageLayout>
  );
};

export default MenPage;
