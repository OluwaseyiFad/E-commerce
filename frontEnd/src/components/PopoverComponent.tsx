import { PopoverGroup } from "@headlessui/react";
import { Link } from "react-router-dom";

const PopoverComponent = () => {
  // Define the links for the popover menu
  const links = [
    { name: "Products", href: "/products" },
    { name: "Orders", href: "/orders" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
      <div className="flex h-full space-x-8">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </PopoverGroup>
  );
};

export default PopoverComponent;
