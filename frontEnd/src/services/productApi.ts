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
    getCartItemsByUser: builder.query({
      query: () => ({
        url: "/api/cart/",
        method: "GET",
        headers: getHeaderAuthorization(),
      }),
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      query: (newItem) => ({
        url: "/api/cart/",
        method: "POST",
        body: newItem,
      }),
      // triggers refetch of cart
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation({
      query: ({ id, action }) => ({
        url: `/api/cart-item/${id}/`,
        method: "PATCH",
        body: { action },
        headers: getHeaderAuthorization(),
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCartItemsByUserQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
} = productApi;
