import { useState } from "react";
import { useAppSelector } from "@/utils/hooks";
import { Product } from "@/utils/types";
import ProductFilters from "@/components/filters/ProductFilters";
import ProductGrid from "@/components/product/ProductGrid";
import ProductPagination from "@/components/product/ProductPagination";
import { useProductFilters } from "@/hooks/useProductFilters";

const COLOR_OPTIONS = ["black", "white", "silver", "gold", "blue"];
const STORAGE_OPTIONS = ["64gb", "128gb", "256gb", "512gb", "1tb"];
const ITEMS_PER_PAGE = 8;

/**
 * Products Page - Main product listing with filters and pagination
 *
 */
const Products = () => {
  const products = useAppSelector((state) => state.products.products) as Product[];
  const [currentPage, setCurrentPage] = useState(0);

  // Use custom hook for filter logic
  const {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    selectedColors,
    handleColorChange,
    selectedStorages,
    handleStorageChange,
  } = useProductFilters(products, COLOR_OPTIONS, STORAGE_OPTIONS);

  // Calculate pagination
  const offset = currentPage * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Reset to first page when filters change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(0);
  };

  const handleColorToggle = (color: string) => {
    handleColorChange(color);
    setCurrentPage(0);
  };

  const handleStorageToggle = (storage: string) => {
    handleStorageChange(storage);
    setCurrentPage(0);
  };

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Latest Products
          </h1>
        </div>

        {/* Main Content */}
        <section className="pt-6 pb-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters Sidebar */}
            <ProductFilters
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              selectedColors={selectedColors}
              colorOptions={COLOR_OPTIONS}
              onColorChange={handleColorToggle}
              selectedStorages={selectedStorages}
              storageOptions={STORAGE_OPTIONS}
              onStorageChange={handleStorageToggle}
            />

            {/* Product Grid and Pagination */}
            <div className="lg:col-span-3">
              <ProductGrid products={paginatedProducts} />
              <ProductPagination
                pageCount={pageCount}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Products;
