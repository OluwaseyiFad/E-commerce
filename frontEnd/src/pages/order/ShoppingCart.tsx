import { useState, useEffect } from "react";
import { useAppDispatch } from "@/utils/hooks";
import { setCart } from "@/store/slices/productSlice";
import {
  useGetCartItemsByUserQuery,
  useUpdateCartItemMutation,
} from "@/services/productApi";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ShoppingCart = () => {
  const [open, setOpen] = useState(true);
  const [updateCartItem] = useUpdateCartItemMutation();
  const { data: cart, error, isLoading } = useGetCartItemsByUserQuery({});
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("cart ", cart);

    if (cart) {
      // Set cart in Redux store
      dispatch(setCart(cart));
      // Set cart items in local state
      setCartItems(cart.items);
    }
  }, [cart, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error("Error fetching product:", error);
    return <div>Error fetching cart items</div>;
  }

  const modifyQuantity = (itemId: number, action: string) => {
    console.log("itemId", itemId);
    console.log("action", action);
    // Call the updateCartItem mutation with the item ID and action
    updateCartItem({ id: itemId, action: action });
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Shopping cart
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {cartItems.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                alt={item.name}
                                src="https://picsum.photos/200/300"
                                className="size-full object-cover"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href="">{item.product_name}</a>
                                  </h3>
                                  <p className="ml-4">{item.total_price}</p>
                                </div>
                                <p className="mt-1 mr-4 text-sm text-gray-500">
                                  {item.color}
                                </p>
                                {/* Add button to add or subtract quantity */}
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() =>
                                      modifyQuantity(item.id, "increment")
                                    }
                                    className="mt-1 text-2xl text-green-500"
                                  >
                                    +
                                  </button>
                                  <button
                                    onClick={() =>
                                      modifyQuantity(item.id, "decrement")
                                    }
                                    className="mt-1 text-2xl text-red-500"
                                  >
                                    -
                                  </button>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">
                                  Qty {item.quantity}
                                </p>

                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>{cart.total_price}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                    >
                      Checkout
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ShoppingCart;
