import CategoryFilter from "./CategoryFilter";
import ColorFilter from "./ColorFilter";
import StorageFilter from "./StorageFilter";

interface ProductFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedColors: string[];
  colorOptions: string[];
  onColorChange: (color: string) => void;
  selectedStorages: string[];
  storageOptions: string[];
  onStorageChange: (storage: string) => void;
}

/**
 * ProductFilters - Sidebar containing all product filter components
 */
const ProductFilters: React.FC<ProductFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
  selectedColors,
  colorOptions,
  onColorChange,
  selectedStorages,
  storageOptions,
  onStorageChange,
}) => {
  return (
    <aside className="hidden lg:block">
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />

      <ColorFilter
        selectedColors={selectedColors}
        colorOptions={colorOptions}
        onColorChange={onColorChange}
      />

      <StorageFilter
        selectedStorages={selectedStorages}
        storageOptions={storageOptions}
        onStorageChange={onStorageChange}
      />
    </aside>
  );
};

export default ProductFilters;
