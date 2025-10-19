import React from "react";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { toggleWishlist } from "@/store/slices/wishlistSlice";

interface WishlistButtonProps {
  productId: number;
  size?: "small" | "medium" | "large";
  className?: string;
}

/**
 * WishlistButton Component - Heart icon button to add/remove products from wishlist
 *
 * Features:
 * - Shows filled heart if product is in wishlist
 * - Shows outline heart if product is not in wishlist
 * - Toggles wishlist state on click
 * - Different sizes available
 */
const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  size = "medium",
  className = "",
}) => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.includes(productId);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if button is inside a link
    e.stopPropagation(); // Prevent event bubbling
    dispatch(toggleWishlist(productId));
  };

  const sizeClasses = {
    small: "h-5 w-5",
    medium: "h-6 w-6",
    large: "h-8 w-8",
  };

  const iconSize = sizeClasses[size];

  return (
    <button
      onClick={handleToggle}
      className={`group rounded-full p-2 transition-colors hover:bg-gray-100 ${className}`}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isInWishlist ? (
        // Filled heart (in wishlist)
        <svg
          className={`${iconSize} fill-red-500 text-red-500 transition-transform group-hover:scale-110`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
      ) : (
        // Outline heart (not in wishlist)
        <svg
          className={`${iconSize} stroke-gray-400 fill-none transition-all group-hover:fill-red-100 group-hover:stroke-red-500`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      )}
    </button>
  );
};

export default WishlistButton;