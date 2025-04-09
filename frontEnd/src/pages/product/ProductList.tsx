import { Link } from "react-router-dom";
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
} from "../../services/productApi";
import { useAppDispatch } from "@/utils/hooks";
import { useEffect } from "react";
import { setProducts, setCategories } from "@/store/slices/productSlice";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { data: products, error, isLoading } = useGetProductsQuery({});
  const { data: categories } = useGetCategoriesQuery({});

  useEffect(() => {
    // Dispatch action to fetch products and categories from backend
    dispatch(setProducts(products));
    dispatch(setCategories(categories));
  }, [products, categories, dispatch]); // Runs only when the component mounts

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error("Error fetching product:", error);
    if (typeof error === "string") {
      return <div>Error: {error}</div>;
    } else if (error instanceof Error) {
      return <div>Error: {error.message}</div>;
    }
  }

  // console.log(`products: ${products}`)
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
