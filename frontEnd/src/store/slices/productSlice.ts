import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  products: [],
  cart: [],
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
  },
});

export const { setProducts, setCategories, setCart } = productsSlice.actions;
export default productsSlice;
