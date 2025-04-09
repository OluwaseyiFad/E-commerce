import { getHeaderAuthorization } from "../utils/functions";
import baseApi from "./baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/api/category",
        method: "GET",
        headers: getHeaderAuthorization(),
      }),
      // providesTags: ["Categories"],
    }),
    getCategoryById: builder.query({
      query: (id) => ({
        url: `/api/category/${id}`,
        method: "GET",
        headers: getHeaderAuthorization(),
      }),
      // providesTags: ["Category"],
    }),
    getProducts: builder.query({
      query: () => ({
        url: "/api/products",
        method: "GET",
        headers: getHeaderAuthorization(),
      }),
      // providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "GET",
        headers: getHeaderAuthorization(),
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
} = productApi;
