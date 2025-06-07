import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/utils/hooks";
import React from "react";
import baseApi from "@/services/baseApi";
import { logout } from "@/store/slices/authSlice";
import { resetStore } from "@/store/slices/productSlice";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const links = [
  { name: "Products", href: "/products" },
  { name: "Orders", href: "/orders" },
  { name: "Profile", href: "/profile" },
];
const DialogOption: React.FC<Props> = ({ open, setOpen }) => {
  const isAuthenticated = !!localStorage.getItem("access");
  const dispatch = useAppDispatch();

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
      />
      <div className="fixed inset-0 z-40 flex">
        <DialogPanel
          transition
          className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
        >
          <div className="flex px-4 pt-5 pb-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            {links.map((link) => (
              <div key={link.name} className="flow-root">
                <Link
                  to={link.href}
                  className="-m-2 block p-2 font-medium text-gray-900"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>

          {isAuthenticated ? (
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <Link
                  to="/login"
                  onClick={() => {
                    setOpen(false);
                    dispatch(logout());
                    dispatch(resetStore());
                    dispatch(baseApi.util.resetApiState());
                  }}
                  className="-m-2 block w-full p-2 text-left font-medium text-gray-900"
                >
                  Log out
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <Link
                  to="/login"
                  className="-m-2 block p-2 font-medium text-gray-900"
                  onClick={() => setOpen(false)}
                >
                  Sign in
                </Link>
              </div>
              <div className="flow-root">
                <Link
                  to="/register"
                  className="-m-2 block p-2 font-medium text-gray-900"
                  onClick={() => setOpen(false)}
                >
                  Create account
                </Link>
              </div>
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DialogOption;
