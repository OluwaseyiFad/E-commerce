import { Link } from "react-router-dom";
import { Product } from "@/utils/types";
import { useState } from "react";
import WishlistButton from "@/components/product/WishlistButton";

interface ProductCardProps {
  product: Product;
}

// ProductCard component to display individual product details
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imgSrc, setImgSrc] = useState(
    product.image || "https://placehold.co/600x400?text=No+Image",
  ); // Default image if none available
  return (
    <div className="group relative">
      <Link key={product.id} to={`/products/${product.id}`}>
        <img
          src={imgSrc}
          alt={product.name + " image"}
          className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
          onError={() => setImgSrc("https://placehold.co/600x400?text=No+Image")}
        />
        <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
      </Link>
      <div className="absolute top-2 right-2">
        <WishlistButton productId={product.id} size="medium" />
      </div>
    </div>
  );
};

export default ProductCard;
