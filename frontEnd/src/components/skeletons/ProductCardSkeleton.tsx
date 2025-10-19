const ProductCardSkeleton = () => {
  return (
    <div className="group relative animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 lg:h-80">
        <div className="h-full w-full bg-gray-300" />
      </div>

      {/* Content skeleton */}
      <div className="mt-4 space-y-2">
        {/* Title skeleton */}
        <div className="h-4 w-3/4 rounded bg-gray-200" />

        {/* Category skeleton */}
        <div className="h-3 w-1/2 rounded bg-gray-200" />

        {/* Price skeleton */}
        <div className="h-5 w-1/4 rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;