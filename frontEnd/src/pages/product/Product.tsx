import { useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/utils/hooks";
import { useCreateCartItemMutation } from "@/services/productApi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const colorClassMap = {
  Black: { class: "bg-black", selectedClass: "ring-black" },
  White: { class: "bg-white", selectedClass: "ring-gray-300" },
  Silver: { class: "bg-gray-300", selectedClass: "ring-gray-400" },
  Gold: { class: "bg-yellow-500", selectedClass: "ring-yellow-600" },
  Blue: { class: "bg-blue-500", selectedClass: "ring-blue-600" },
};

// Add feature list to products that covers warranty, battery Life, display, camera, Condition etc
const Product = () => {
  const [createCartItem] = useCreateCartItemMutation(); // Hook to create a cart item
  const { id } = useParams(); // Get product id from the URL
  const productId = id ? parseInt(id, 10) : null;

  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products); // Get products from the Redux store
  const product = products.find((product) => product.id === productId); // Find the product by id
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const transformedColors = product.colors.map(({ color, in_stock }) => ({
    name: color,
    in_stock,
    ...(colorClassMap[color] || {
      class: "bg-gray-200",
      selectedClass: "ring-gray-400",
    }),
  }));

  const createCartItemHandler = async () => {
    console.log("Creating cart item with productId:", productId);
    console.log("Selected color:", selectedColor);
    console.log("Selected size:", selectedSize);

    const cartItem = {
      productId: productId,
      color: selectedColor,
      size: selectedSize,
    };

    try {
      const response = await createCartItem(cartItem).unwrap();
      console.log("Cart item created successfully:", response);
    } catch (error) {
      console.error("Error creating cart item:", error);
    }
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <div className="flex items-center">
              <a href="#" className="mr-2 text-sm font-medium text-gray-900">
                {product.category}
              </a>
              <svg
                fill="currentColor"
                width={16}
                height={20}
                viewBox="0 0 16 20"
                aria-hidden="true"
                className="h-5 w-4 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
            <li className="text-sm">
              <a
                href="#"
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <img
            alt={product.name}
            src="https://picsum.photos/200/300"
            className="hidden size-full rounded-lg object-cover lg:block"
          />
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <img
              alt={product.name}
              src="https://picsum.photos/200/300"
              className="aspect-3/2 w-full rounded-lg object-cover"
            />
            <img
              alt={product.name}
              src="https://picsum.photos/200/300"
              className="aspect-3/2 w-full rounded-lg object-cover"
            />
          </div>
          <img
            alt={product.name}
            src="https://picsum.photos/200/300"
            className="aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-auto"
          />
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {product.price}
            </p>

            <form className="mt-10">
              {/* Colors */}
              {[
                "Gaming Phones",
                "Flagship Phones",
                "Budget Phones",
                "Tablets",
              ].includes(product.category) && (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                    <fieldset aria-label="Choose a color" className="mt-4">
                      <RadioGroup
                        value={selectedColor}
                        onChange={setSelectedColor}
                        className="flex items-center gap-x-3"
                      >
                        {transformedColors.map((color) => (
                          <Radio
                            key={color.name}
                            value={color.name}
                            disabled={!color.in_stock}
                            aria-label={color.name}
                            className={classNames(
                              color.selectedClass,
                              color.in_stock
                                ? ""
                                : "cursor-not-allowed opacity-30",
                              "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-hidden data-checked:ring-2 data-focus:data-checked:ring-3 data-focus:data-checked:ring-offset-1",
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={classNames(
                                color.class,
                                "size-8 rounded-full border border-black/10",
                              )}
                            />
                          </Radio>
                        ))}
                      </RadioGroup>
                    </fieldset>
                  </div>

                  {/* Sizes */}
                  <div className="mt-10">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Storage sizes
                      </h3>
                    </div>

                    <fieldset aria-label="Choose a size" className="mt-4">
                      <RadioGroup
                        value={selectedSize}
                        onChange={setSelectedSize}
                        className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                      >
                        {product.storage.map((size) => (
                          <Radio
                            key={size.size}
                            value={size.size}
                            disabled={!size.in_stock}
                            className={classNames(
                              size.in_stock
                                ? "cursor-pointer bg-white text-gray-900 shadow-xs"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-hidden data-focus:ring-2 data-focus:ring-indigo-500 sm:flex-1 sm:py-6",
                            )}
                          >
                            <span>{size.size}</span>
                            {size.in_stock ? (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-checked:border-indigo-500 group-data-focus:border"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  stroke="currentColor"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  className="absolute inset-0 size-full stroke-2 text-gray-200"
                                >
                                  <line
                                    x1={0}
                                    x2={100}
                                    y1={100}
                                    y2={0}
                                    vectorEffect="non-scaling-stroke"
                                  />
                                </svg>
                              </span>
                            )}
                          </Radio>
                        ))}
                      </RadioGroup>
                    </fieldset>
                  </div>
                </>
              )}

              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  createCartItemHandler();
                }}
                disabled={
                  (!selectedColor || !selectedSize) &&
                  product.category in
                    [
                      "Gaming Phones",
                      "Flagship Phones",
                      "Budget Phones",
                      "Tablets",
                    ]
                }
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
