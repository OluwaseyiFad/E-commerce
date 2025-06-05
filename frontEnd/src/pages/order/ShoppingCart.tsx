import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/utils/hooks";
import { setCart } from "@/store/slices/productSlice";
import {
  useGetCartItemsByUserQuery,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  useClearCartMutation,
} from "@/services/productApi";
import CartSummary from "./CartSummary";
import { CartItemType } from "@/utils/types";
import ReactPaginate from "react-paginate";

const ITEMS_PER_PAGE = 8; // Number of items per page

const ShoppingCart = () => {
  const dispatch = useAppDispatch();

  const {
    data: cart,
    isLoading,
    error,
    refetch,
  } = useGetCartItemsByUserQuery({});
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [clearCart] = useClearCartMutation();

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (cart?.items) {
      dispatch(setCart(cart)); // Update global cart state
    }
  }, [cart, dispatch]);

  // Pagination calculation
  const pageCount = cart?.items
    ? Math.ceil(cart.items.length / ITEMS_PER_PAGE)
    : 0;

  // Get items for the current page
  const paginatedItems = cart?.items
    ? cart.items.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE,
      )
    : [];

  // Handle page change for pagination
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  // Modify cart item quantity or remove
  const modifyCartItem = async (itemId: number, action: string) => {
    try {
      if (action === "remove") {
        await deleteCartItem(itemId).unwrap();
      } else {
        await updateCartItem({ id: itemId, action }).unwrap();
      }
      await refetch();
    } catch (err) {
      console.error("Error modifying cart item:", err);
      alert("Failed to modify cart item");
    }
  };

  // Clear the entire cart
  const handleClearCart = async () => {
    try {
      await clearCart({}).unwrap();
      await refetch();
    } catch (err) {
      console.error("Error clearing cart:", err);
      alert("Failed to clear cart");
    }
  };

  if (isLoading)
    return (
      <div className="rounded-md border border-gray-300 bg-gray-100 p-4 text-gray-700 shadow-sm">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="rounded-md border border-red-300 bg-red-100 p-4 text-red-700 shadow-sm">
        <strong>No cart found!</strong>
      </div>
    );

  const hasItems = cart?.items?.length > 0; // Check if cart has items

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Your Cart</h2>
            {hasItems && (
              <button
                onClick={handleClearCart}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Clear Cart
              </button>
            )}
          </div>

          {!hasItems ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-200">
                {/* Map paginated items to display as list */}
                {paginatedItems.map((item: CartItemType) => (
                  <li
                    key={item.id}
                    className="flex border-b border-gray-200 py-6"
                  >
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src="https://picsum.photos/200/300"
                        alt={item.product_name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 justify-between">
                      <div className="flex w-full flex-col space-y-1 text-left">
                        <h3 className="text-base font-medium text-gray-900">
                          {item.product_name}
                        </h3>
                        <div className="flex gap-3 text-sm text-gray-500">
                          {item.color && <span>{item.color}</span>}
                          {item.size && <span>{item.size}</span>}
                        </div>
                        <p className="text-sm text-gray-900">
                          ${item.total_price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex w-28 flex-col items-center justify-center">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => modifyCartItem(item.id, "increment")}
                            className="text-lg font-bold text-green-600"
                          >
                            +
                          </button>
                          <span className="text-sm">Qty: {item.quantity}</span>
                          <button
                            onClick={() => modifyCartItem(item.id, "decrement")}
                            className="text-lg font-bold text-red-600"
                          >
                            -
                          </button>
                        </div>
                        <button
                          onClick={() => modifyCartItem(item.id, "remove")}
                          className="mt-2 text-sm text-cyan-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Pagination controls */}
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={handlePageChange}
                containerClassName="mt-6 flex justify-center gap-2 text-sm"
                pageClassName="cursor-pointer rounded-md border border-gray-300 px-3 py-1 hover:bg-cyan-600 hover:text-white"
                activeClassName="bg-cyan-600 text-white"
                previousLabel="<"
                nextLabel=">"
                disabledClassName="opacity-50 cursor-not-allowed"
                breakLabel="..."
                breakClassName="px-2"
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
              />
            </>
          )}
        </div>

        {/* Cart Summary and Checkout */}
        <div className="h-fit rounded-lg bg-white p-6 shadow">
          <CartSummary totalPrice={cart?.total_price || 0} />
          <div className="flex flex-col gap-3">
            <Link
              to={hasItems ? "/checkout" : "#"}
              onClick={(e) => {
                if (!hasItems) e.preventDefault();
              }}
              aria-disabled={!hasItems}
              className={`w-full rounded-md py-2 font-medium transition ${
                !hasItems
                  ? "cursor-not-allowed bg-gray-400 text-gray-300"
                  : "bg-cyan-600 text-white hover:bg-cyan-700"
              }`}
            >
              Checkout
            </Link>
            <Link
              to="/products"
              className="text-center text-sm text-cyan-600 hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
