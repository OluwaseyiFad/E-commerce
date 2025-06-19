import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cart: [],
  orders: [],
};

// Redux slice for managing products, categories, cart, and orders
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
      localStorage.removeItem("cart");
    },
    // Action to clear store state and remove them from local storage
    resetStore: (state) => {
      localStorage.removeItem("cart");
      localStorage.removeItem("orders");
      localStorage.removeItem("products");
      state.cart = [];
      state.orders = [];
      state.products = [];
    },
  },
});

// Export actions for use in components
export const { setProducts, setCart, setOrders, clearCart, resetStore } =
  productsSlice.actions;
export default productsSlice;
