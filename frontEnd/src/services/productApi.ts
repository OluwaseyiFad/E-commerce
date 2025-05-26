import { getHeaderAuthorization } from "../utils/functions";
import baseApi from "./baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all categories
    getCategories: builder.query({
      query: () => ({
        url: "/api/category",
        method: "GET",
        headers: getHeaderAuthorization(),
      }),
    }),
    // Fetch a category by ID
    getCategoryById: builder.query({
      query: (id) => ({
        url: `/api/category/${id}`,
        method: "GET",
        headers: getHeaderAuthorization(),
      }),
    }),
    // Fetch all products
    getProducts: builder.query({
      query: () => ({
        url: "/api/products",
        method: "GET",
        headers: getHeaderAuthorization(),
      }),
    }),
    // Fetch a product by ID
    getProductById: builder.query({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "GET",
        headers: getHeaderAuthorization(),
      }),
    }),
    // Fetch cart items for the current user
    getCartItemsByUser: builder.query({
      query: () => ({
        url: "/api/cart/me",
        method: "GET",
        headers: getHeaderAuthorization(),
      }),
      providesTags: ["Cart"],
    }),
    // Mutations for cart operations
    addToCart: builder.mutation({
      query: (newItem) => ({
        url: "/api/cart/",
        method: "POST",
        body: newItem,
      }),
      // triggers refetch of cart
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: "/api/cart/clear/",
        method: "POST",
        headers: getHeaderAuthorization(),
      }),
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
    // Fetch orders for the current user
    getOrdersByUser: builder.query({
      query: () => ({
        url: "/api/orders/me",
        method: "GET",
        headers: getHeaderAuthorization(),
      }),
      providesTags: ["Orders"],
    }),
    // Fetch an order by ID
    getOrderById: builder.query({
      query: (id) => ({
        url: `/api/orders/${id}/`,
        method: "GET",
        headers: getHeaderAuthorization(),
      }),
    }),
    // Create a new order
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

// Export hooks for the defined endpoints
export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCartItemsByUserQuery,
  useAddToCartMutation,
  useClearCartMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  useCreateCartItemMutation,
  useGetOrdersByUserQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
} = productApi;
