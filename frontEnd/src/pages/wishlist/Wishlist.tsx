import { useAppSelector, useAppDispatch } from "@/utils/hooks";
import { Product } from "@/utils/types";
import { Link } from "react-router-dom";
import WishlistButton from "@/components/product/WishlistButton";
import { clearWishlist } from "@/store/slices/wishlistSlice";

/**
 * Wishlist Page - Displays user's favorite/saved products
 *
 * Features:
 * - Shows all products added to wishlist
 * - Remove individual items
 * - Clear all wishlist
 * - Navigate to product details
 * - Empty state when no items
 */
const Wishlist = () => {
  const dispatch = useAppDispatch();
  const wishlistIds = useAppSelector((state) => state.wishlist.items);
  const allProducts = useAppSelector((state) => state.products.products) as Product[];

  // Filter products that are in the wishlist
  const wishlistProducts = allProducts.filter((product) =>
    wishlistIds.includes(product.id)
  );

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear your entire wishlist?")) {
      dispatch(clearWishlist());
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            My Wishlist
          </h1>
          {wishlistProducts.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-sm font-medium text-red-600 hover:text-red-500"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Wishlist Count */}
        <div className="mt-6">
          <p className="text-sm text-gray-600">
            {wishlistProducts.length === 0
              ? "No items in your wishlist"
              : `${wishlistProducts.length} ${wishlistProducts.length === 1 ? "item" : "items"} saved`}
          </p>
        </div>

        {/* Empty State */}
        {wishlistProducts.length === 0 ? (
          <div className="mt-12 text-center">
            <svg
              className="mx-auto h-24 w-24 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Your wishlist is empty
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Start adding products you love by clicking the heart icon!
            </p>
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          /* Product Grid */
          <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="group relative">
                <Link to={`/products/${product.id}`}>
                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
                    <img
                      src={product.image || "https://placehold.co/600x400?text=No+Image"}
                      alt={product.name}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    ${product.price}
                  </p>
                </Link>
                <div className="absolute top-2 right-2">
                  <WishlistButton productId={product.id} size="medium" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Continue Shopping Link */}
        {wishlistProducts.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="text-sm font-medium text-cyan-600 hover:text-cyan-500"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Wishlist;