import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../services/productApi";
import { useAppDispatch } from "@/utils/hooks";
import { useEffect } from "react";
import { setProducts } from "@/store/slices/productSlice";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { data: products, error, isLoading } = useGetProductsQuery({});

  useEffect(() => {
    // Dispatch action to fetch products from backend
    dispatch(setProducts(products));
  }, [products, dispatch]); // Runs only when the component mounts

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
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group"
            >
              <img
                // src={product.img}
                src="https://picsum.photos/200/300"
                alt={product.description}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
              />
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
