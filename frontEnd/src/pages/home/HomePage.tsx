import { useEffect } from "react";
import { useAppDispatch } from "@/utils/hooks";
import { setProducts, setCategories } from "@/store/slices/productSlice";
import { setUserProfile } from "@/store/slices/authSlice";
import { useGetCurrrentUserProfileQuery } from "../../services/userApi";
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
} from "../../services/productApi";
import ProductCard from "../product/ProductCard";
import { Product } from "@/utils/types";

const HomePage = () => {
  const { data: products = [], error, isLoading } = useGetProductsQuery({});
  const { data: categories = [] } = useGetCategoriesQuery({});
  const { data: userProfile } = useGetCurrrentUserProfileQuery({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    // console.log("products", products);
    // Set products, categories, and user profile in the Redux store
    dispatch(setProducts(products));
    dispatch(setCategories(categories));
    dispatch(setUserProfile(userProfile));
  }, [products, categories, userProfile, dispatch]);

  if (isLoading)
    return (
      <div className="rounded-md border border-gray-300 bg-gray-100 p-4 text-gray-700 shadow-sm">
        Loading...
      </div>
    );
  if (error) {
    return (
      <div className="rounded-md border border-red-300 bg-red-100 p-4 text-red-700 shadow-sm">
        <strong>No products found!</strong>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-cyan-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl leading-tight font-bold">
            Discover Your Perfect Device
          </h1>
          <p className="mt-4 text-lg">
            Explore a wide range of phones, iPads, tablets, and accessories! all
            at unbeatable prices.
          </p>
          <div className="mt-8">
            <a
              href="#shop-now"
              className="inline-block rounded-lg bg-white px-6 py-3 text-lg font-semibold text-cyan-600 transition hover:bg-gray-100"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="shop-now" className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-semibold">Featured Products</h2>
              <p className="mt-2 text-lg text-gray-600">
                Check out our latest and most popular items!
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <a
                href="/products"
                className="inline-block rounded-md bg-cyan-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-cyan-700"
              >
                See All
              </a>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Show only the first 8 products */}
            {products?.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.slice(0, 8).map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-gray-600">No products found.</div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">SuperLian</h3>
              <p className="mt-2 text-sm">
                Your one-stop shop for all things tech.
              </p>
            </div>
            <div className="space-x-6">
              <a href="#" className="text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-sm">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
