import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
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
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    // Action to clear the cart and remove it from local storage
    clearCart: (state) => {
      localStorage.removeItem("cart");
      Object.assign(state.cart, initialState.cart);
    },
  },
});

// Export actions for use in components
export const { setProducts, setCategories, setCart, clearCart, setOrders } =
  productsSlice.actions;
export default productsSlice;
