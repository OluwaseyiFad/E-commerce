import { Link } from "react-router-dom";
import { useAppDispatch } from "@/utils/hooks";
import { Bars3Icon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.svg";
import baseApi from "@/services/baseApi";
import { logout } from "../store/slices/authSlice";
import { resetStore } from "../store/slices/productSlice";
import { useGetCartItemsByUserQuery } from "@/services/productApi";
import PopoverComponent from "./PopoverComponent";

interface NavbarProps {
  setOpen: (open: boolean) => void;
}

const Navbar = ({ setOpen }: NavbarProps) => {
  const isAuthenticated = !!localStorage.getItem("access");
  const dispatch = useAppDispatch();
  const { data: cart } = useGetCartItemsByUserQuery(undefined, {
    skip: !isAuthenticated,
  });
  return (
    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-b border-gray-200">
        <div className="flex h-16 items-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
          >
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Open menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>

          {/* Logo */}
          <div className="ml-4 flex lg:ml-0">
            <Link to="/">
              <span className="sr-only">superLian</span>
              <img alt="" src={logo} className="h-8 w-auto" />
            </Link>
          </div>

          {/* Flyout menus */}
          <PopoverComponent />

          <div className="ml-auto flex items-center">
            {isAuthenticated ? (
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <Link
                  to="/login"
                  onClick={() => {
                    dispatch(logout());
                    dispatch(resetStore()); // Reset product store
                    dispatch(baseApi.util.resetApiState()); // Reset API state
                  }}
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Log out
                </Link>
                <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
              </div>
            ) : (
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Sign in
                </Link>
                <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                <Link
                  to="/register"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Create account
                </Link>
              </div>
            )}

            {/* Cart */}
            <div className="ml-4 flow-root lg:ml-6">
              <Link
                to="/shopping-cart"
                className="group -m-2 flex items-center p-2"
              >
                <ShoppingBagIcon
                  aria-hidden="true"
                  className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                  {Array.isArray(cart) ? 0 : cart?.items?.length || 0}
                </span>
                <span className="sr-only">items in cart, view bag</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
