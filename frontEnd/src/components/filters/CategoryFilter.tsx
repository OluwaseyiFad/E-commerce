interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories?: string[];
}

/**
 * CategoryFilter - Renders a list of category buttons for filtering products
 */
const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  categories = ["All", "Phones", "Laptops", "Tablets", "Accessories"],
}) => {
  return (
    <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
      {categories.map((cat) => (
        <li key={cat}>
          <button
            onClick={() => onCategoryChange(cat === "All" ? "" : cat)}
            className={`hover:text-cyan-500 ${
              selectedCategory === (cat === "All" ? "" : cat)
                ? "font-semibold text-cyan-600"
                : ""
            }`}
          >
            {cat}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryFilter;
