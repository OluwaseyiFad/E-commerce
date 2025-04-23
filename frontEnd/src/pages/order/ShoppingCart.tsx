import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/utils/hooks";
import { setCart } from "@/store/slices/productSlice";
import {
  useGetCartItemsByUserQuery,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} from "@/services/productApi";

const ShoppingCart = () => {
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const {
    data: cart,
    isLoading,
    error,
    refetch,
  } = useGetCartItemsByUserQuery({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cart) {
      dispatch(setCart(cart));
    }
  }, [cart, dispatch]);

  // Function to modify cart item
  // action can be "increment +", "decrement -", or "remove"
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
    }
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error loading cart.</div>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow lg:col-span-2">
          <h2 className="mb-4 text-2xl font-semibold">Your Cart</h2>
          {cart?.items?.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cart?.items?.map((item) => (
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

                  {/* Product details */}
                  <div className="ml-4 flex flex-1 justify-between">
                    <div className="flex w-full flex-col items-start justify-start space-y-1 text-left">
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

                    {/* Quantity modification and remove button */}
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
          )}
        </div>

        {/* Order Summary */}
        <div className="h-fit rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-xl font-semibold">Order Summary</h3>
          <div className="mb-2 flex justify-between text-lg font-medium text-gray-800">
            <span>Subtotal</span>
            <span>{cart?.total_price}</span>
          </div>
          <div className="mb-2 flex justify-between text-lg font-medium text-gray-800">
            <span>Shipping</span>
            <span>$5.00</span>
          </div>
          <div className="mb-2 flex justify-between text-lg font-medium text-gray-800">
            <span>Tax</span>
            <span>$6.16</span>
          </div>
          <div className="mb-2 flex justify-between text-lg font-medium text-gray-800">
            <span>Order total</span>
            <span>${(cart?.total_price + 5 + 6.16).toFixed(2)}</span>
          </div>
          <p className="mb-4 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="flex flex-col gap-3">
            <button className="w-full rounded-md bg-cyan-600 py-2 font-medium text-white transition hover:bg-cyan-700">
              Checkout
            </button>
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
