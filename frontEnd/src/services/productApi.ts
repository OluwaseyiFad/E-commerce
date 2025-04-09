import { getHeaderAuthorization } from "../utils/functions";
import baseApi from "./baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
