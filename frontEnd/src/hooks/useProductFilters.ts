import { useEffect, useState } from "react";
import { Product } from "@/utils/types";

// Category groupings
const ACCESSORY_SUBCATEGORIES = [
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

const PHONE_SUBCATEGORIES = [
  "Budget Phones",
  "Flagship Phones",
  "Gaming Phones",
  "Tablets",
];

/**
 * Custom hook to handle product filtering logic
 */
export const useProductFilters = (
  products: Product[],
  colorOptions: string[],
  storageOptions: string[]
) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([...colorOptions]);
  const [selectedStorages, setSelectedStorages] = useState<string[]>([...storageOptions]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Filter products whenever filter criteria change
  useEffect(() => {
    const filtered = products.filter((product: Product) => {
      // Search matching by name or brand
      const matchSearch = searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(product.brand).toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      // Category matching with grouping
      const matchCategory = selectedCategory
        ? selectedCategory === "Accessories"
          ? ACCESSORY_SUBCATEGORIES.includes(product.category)
          : selectedCategory === "Phones"
            ? PHONE_SUBCATEGORIES.includes(product.category)
            : product.category === selectedCategory
        : true;

      // Color matching
      const availableColors = (product.colors || [])
        .filter((c) => c.in_stock)
        .map((c) => c.color.toLowerCase());

      const matchColor =
        availableColors.length === 0
          ? true
          : selectedColors.some((color) => availableColors.includes(color));

      // Storage matching
      const availableStorages = (product.storage || [])
        .filter((s) => s.in_stock)
        .map((s) => s.size.toLowerCase());

      const matchStorage =
        availableStorages.length === 0
          ? true
          : selectedStorages.some((size) => availableStorages.includes(size));

      return matchSearch && matchCategory && matchColor && matchStorage;
    });

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, selectedColors, selectedStorages, products]);

  // Toggle functions
  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleStorageChange = (storage: string) => {
    setSelectedStorages((prev) =>
      prev.includes(storage) ? prev.filter((s) => s !== storage) : [...prev, storage]
    );
  };

  return {
    filteredProducts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedColors,
    handleColorChange,
    selectedStorages,
    handleStorageChange,
  };
};
