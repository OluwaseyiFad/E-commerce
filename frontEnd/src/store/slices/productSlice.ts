import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  products: [],
  cart: [],
  orders: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { setProducts, setCategories, setCart, clearCart, setOrders } =
  productsSlice.actions;
export default productsSlice;
