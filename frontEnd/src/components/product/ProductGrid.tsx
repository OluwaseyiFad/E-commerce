import { Product } from "@/utils/types";
import ProductCard from "../../pages/product/ProductCard";

interface ProductGridProps {
  products: Product[];
}

/**
 * ProductGrid - Displays products in a responsive grid layout
 */
const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (products.length === 0) {
    return <div className="text-gray-600">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
