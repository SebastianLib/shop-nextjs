import ProductsFilters from "@/components/shared/ProductsFilters";
import Products from "@/components/shared/Products";
import PageLayout from "@/components/shared/PageLayout";
import { getCategories } from "@/lib/db/category";
import { getSizes } from "@/lib/db/size";

const WomenPage = async() => {
  const categories = await getCategories();
  const sizes = await getSizes();
  return (
    <PageLayout>
      <ProductsFilters categories={categories} sizes={sizes}/>
      <Products gender="Women" />
    </PageLayout>
  );
};

export default WomenPage;
