import { useEffect, useState } from "react";
import { useAppSelector } from "@/utils/hooks";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import ProductCard from "./ProductCard";
import { Product } from "@/utils/types";
import ReactPaginate from "react-paginate";

const colorOptions = ["black", "white", "silver", "gold", "blue"];
const storageOptions = ["64gb", "128gb", "256gb", "512gb", "1tb"];

const Products = () => {
  const products = useAppSelector(
    (state) => state.products.products,
  ) as Product[];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([
    ...colorOptions,
  ]);
  const [selectedStorages, setSelectedStorages] = useState<string[]>([
    ...storageOptions,
  ]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  // Define which categories fall under "Accessories"
  const accessorySubcategories = [
    "Bluetooth Speakers",
    "Headphones",
    "Wireless Earbuds",
    "Smartwatches",
    "Screen Protectors",
    "Phone Cases",
    "Chargers & Cables",
    "Power Banks",
    "Accessories",
    "Wearables",
  ];

  // Define which categories fall under "Phones"
  const phoneSubcategories = [
    "Budget Phones",
    "Flagship Phones",
    "Gaming Phones",
    "Tablets",
  ];

  // Filter products every time filter state changes
  useEffect(() => {
    const filtered = products.filter((product: Product) => {
      // Match category or group into "Accessories" or "Phones"
      const matchCategory = selectedCategory
        ? selectedCategory === "Accessories"
          ? accessorySubcategories.includes(product.category)
          : selectedCategory === "Phones"
            ? phoneSubcategories.includes(product.category)
            : product.category === selectedCategory
        : true;

      // Extract available in-stock colors
      const availableColors = (product.colors || [])
        .filter((c) => c.in_stock)
        .map((c) => c.color.toLowerCase());

      const matchColor =
        availableColors.length === 0
          ? true
          : selectedColors.some((color) => availableColors.includes(color));

      // Extract available in-stock storages
      const availableStorages = (product.storage || [])
        .filter((s) => s.in_stock)
        .map((s) => s.size.toLowerCase());

      const matchStorage =
        availableStorages.length === 0
          ? true
          : selectedStorages.some((size) => availableStorages.includes(size));

      return matchCategory && matchColor && matchStorage;
    });

    setFilteredProducts(filtered);
    setCurrentPage(0); // reset to first page when filters change
  }, [selectedCategory, selectedColors, selectedStorages, products]);

  // Toggle checkbox values for color or storage filters
  const handleCheckboxChange = (value: string, type: "color" | "storage") => {
    const toggle = (list: string[]) =>
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

    if (type === "color") setSelectedColors((prev) => toggle(prev));
    else setSelectedStorages((prev) => toggle(prev));
  };

  const offset = currentPage * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    offset,
    offset + itemsPerPage,
  );
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Latest Products
          </h1>
        </div>

        <section className="pt-6 pb-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters Sidebar */}
            <aside className="hidden lg:block">
              {/* Category Filter */}
              <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                {["All", "Phones", "Laptops", "Tablets", "Accessories"].map(
                  (cat) => (
                    <li key={cat}>
                      <button
                        onClick={() =>
                          setSelectedCategory(cat === "All" ? "" : cat)
                        }
                        className={`hover:text-cyan-500 ${
                          selectedCategory === (cat === "All" ? "" : cat)
                            ? "font-semibold text-cyan-600"
                            : ""
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  ),
                )}
              </ul>

              {/* Color Filter */}
              <Disclosure as="div" className="border-b border-gray-200 py-6">
                <h3 className="-my-3 flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">Color</span>
                    <span className="ml-6 flex items-center">
                      <PlusIcon className="size-5 group-data-open:hidden" />
                      <MinusIcon className="size-5 group-not-data-open:hidden" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                  <div className="space-y-4">
                    {colorOptions.map((color) => (
                      <div key={color} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`color-${color}`}
                          checked={selectedColors.includes(color)}
                          onChange={() => handleCheckboxChange(color, "color")}
                          className="h-4 w-4 rounded border-gray-300 text-cyan-600"
                        />
                        <label
                          htmlFor={`color-${color}`}
                          className="text-sm text-gray-600"
                        >
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                </DisclosurePanel>
              </Disclosure>

              {/* Storage Filter */}
              <Disclosure as="div" className="border-b border-gray-200 py-6">
                <h3 className="-my-3 flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">Storage</span>
                    <span className="ml-6 flex items-center">
                      <PlusIcon className="size-5 group-data-open:hidden" />
                      <MinusIcon className="size-5 group-not-data-open:hidden" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                  <div className="space-y-4">
                    {storageOptions.map((size) => (
                      <div key={size} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`storage-${size}`}
                          checked={selectedStorages.includes(size)}
                          onChange={() => handleCheckboxChange(size, "storage")}
                          className="h-4 w-4 rounded border-gray-300 text-cyan-600"
                        />
                        <label
                          htmlFor={`storage-${size}`}
                          className="text-sm text-gray-600"
                        >
                          {size.toUpperCase()}
                        </label>
                      </div>
                    ))}
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </aside>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              {paginatedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {paginatedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  <div className="mt-10 flex justify-center">
                    <ReactPaginate
                      previousLabel={"←"}
                      nextLabel={"→"}
                      pageCount={pageCount}
                      onPageChange={({ selected }) => setCurrentPage(selected)}
                      containerClassName="flex gap-2 text-gray-700"
                      activeClassName="text-cyan-600 font-bold"
                      pageClassName="px-3 py-1 border rounded"
                      previousClassName="px-3 py-1 border rounded"
                      nextClassName="px-3 py-1 border rounded"
                      disabledClassName="opacity-50 cursor-not-allowed"
                    />
                  </div>
                </>
              ) : (
                <div className="text-gray-600">No products found.</div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Products;
