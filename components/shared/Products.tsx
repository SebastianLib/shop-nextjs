"use client"
import SingleItem from "@/components/shared/SingleItem";
import Pagination from "@/components/shared/Pagination";
import useFetchProducts from "@/hooks/useFetchProducts";
import Loading from "@/components/shared/LoadingComponent";

const Products = ({gender}:{gender:string}) => {
  const { products, loading, totalProductsPages } = useFetchProducts(gender);
  
  if (loading) {
    return (
        <Loading />
    );
  }
  return (
    <div>
      {products && products.length === 0 && (
        <h2 className="text-center text-2xl mt-10">No products found</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {products &&
          products.map((product) => (
            <SingleItem key={product.id} {...product} />
          ))}
      </div>
      {products && products.length !== 0 && (
        <Pagination totalProductsPages={totalProductsPages} />
      )}
    </div>
  );
};

export default Products;