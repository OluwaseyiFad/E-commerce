import ProductCardSkeleton from "./ProductCardSkeleton";

interface ProductGridSkeletonProps {
  count?: number;
}

const ProductGridSkeleton = ({ count = 8 }: ProductGridSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductGridSkeleton;