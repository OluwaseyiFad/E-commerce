import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  products: [],
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
  },
});

export const { setProducts, setCategories } = productsSlice.actions;
export default productsSlice;
