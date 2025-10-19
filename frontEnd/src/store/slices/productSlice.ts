import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/utils/types";

/**
 * Products State Interface
 */
interface ProductsState {
  products: Product[];
  cart: any[]; // TODO: Define CartItem type
  orders: any[]; // TODO: Define Order type
}

const initialState: ProductsState = {
  products: [],
  cart: [],
  orders: [],
};

// Redux slice for managing products, categories, cart, and orders
// All product data is persisted via redux-persist
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Reducers to set products, categories, cart, and orders
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setCart: (state, action: PayloadAction<any[]>) => {
      state.cart = action.payload;
    },
    setOrders: (state, action: PayloadAction<any[]>) => {
      state.orders = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
    },
    // Action to clear store state
    resetStore: (state) => {
      state.cart = [];
      state.orders = [];
      state.products = [];
    },
  },
});

export const { setProducts, setCart, setOrders, clearCart, resetStore } =
  productsSlice.actions;
export default productsSlice;
