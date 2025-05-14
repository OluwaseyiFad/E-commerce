import { useEffect, useState } from "react";
import { useAppSelector } from "@/utils/hooks";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import ProductCard from "./ProductCard";

const colorOptions = ["black", "white", "silver", "gold", "blue"];
const storageOptions = ["64gb", "128gb", "256gb", "512gb", "1tb"];

const Products = () => {
  const products = useAppSelector((state) => state.products.products);
  const categories = useAppSelector((state) => state.products.categories);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([
    ...colorOptions,
  ]);
  const [selectedStorages, setSelectedStorages] = useState<string[]>([
    ...storageOptions,
  ]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    console.log("products", products);
    const filtered = products.filter((product: any) => {
      const matchCategory = selectedCategory
        ? product.category === selectedCategory
        : true;

      const availableColors = (product.colors || [])
        .filter((c) => c.in_stock)
        .map((c) => c.color.toLowerCase());
      const matchColor = selectedColors.some((color) =>
        availableColors.includes(color),
      );

      const availableStorages = (product.storage || [])
        .filter((s) => s.in_stock)
        .map((s) => s.size.toLowerCase());
      const matchStorage = selectedStorages.some((size) =>
        availableStorages.includes(size),
      );

      return matchCategory && matchColor && matchStorage;
    });
    setFilteredProducts(filtered);
  }, [selectedCategory, selectedColors, selectedStorages, products]);

  const handleCheckboxChange = (value: string, type: "color" | "storage") => {
    const toggle = (list: string[]) =>
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

    if (type === "color") setSelectedColors((prev) => toggle(prev));
    else setSelectedStorages((prev) => toggle(prev));
  };

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
              {/* Categories */}
              <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                <li>
                  <button onClick={() => setSelectedCategory("")}>
                    All Categories
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category.name}>
                    <button onClick={() => setSelectedCategory(category.name)}>
                      {category.name}
                    </button>
                  </li>
                ))}
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
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
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
