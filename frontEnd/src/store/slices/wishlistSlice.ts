import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
  items: number[]; // Product IDs
}

const initialState: WishlistState = {
  items: [],
};

/**
 * Wishlist Slice - Manages user's wishlist (favorite products)
 *
 * Features:
 * - Add products to wishlist
 * - Remove products from wishlist
 * - Check if product is in wishlist
 * - Persisted via redux-persist
 */
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<number>) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((id) => id !== action.payload);
    },
    toggleWishlist: (state, action: PayloadAction<number>) => {
      const index = state.items.indexOf(action.payload);
      if (index > -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice;