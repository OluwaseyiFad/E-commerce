import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setOrders: (state, action) => {
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
