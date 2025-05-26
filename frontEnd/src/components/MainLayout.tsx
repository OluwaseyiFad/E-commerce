import Navbar from "./Navbar";
import DialogOption from "./Dialog";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const MainLayout = () => {
  const [open, setOpen] = useState(false); // State to control the dialog visibility

  return (
    <div className="bg-white">
      <DialogOption open={open} setOpen={setOpen} />
      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-cyan-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $1000
        </p>
        <Navbar setOpen={setOpen} />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
