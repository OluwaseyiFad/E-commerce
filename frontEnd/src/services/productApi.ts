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
    deleteCartItem: builder.mutation({
      query: (id) => ({
        url: `/api/cart-item/${id}/`,
        method: "DELETE",
        headers: getHeaderAuthorization(),
      }),
      invalidatesTags: ["Cart"],
    }),
    createCartItem: builder.mutation({
      query: (newItem) => ({
        url: "/api/cart-item/",
        method: "POST",
        body: newItem,
        headers: getHeaderAuthorization(),
      }),
      invalidatesTags: ["Cart"],
    }),
    getOrdersByUser: builder.query({
      query: () => ({
        url: "/api/orders/",
        method: "GET",
        headers: getHeaderAuthorization(),
      }),
      providesTags: ["Orders"],
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `/api/orders/${id}/`,
        method: "GET",
        headers: getHeaderAuthorization(),
      }),
    }),
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/api/orders/",
        method: "POST",
        body: newOrder,
        headers: getHeaderAuthorization(),
      }),
      invalidatesTags: ["Orders"],
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
  useDeleteCartItemMutation,
  useCreateCartItemMutation,
  useGetOrdersByUserQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
} = productApi;
