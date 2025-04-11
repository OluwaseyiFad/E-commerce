import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_API_URL,
  }),
  tagTypes: ["Cart", "Product"], // Define tag types for caching
  endpoints: () => ({}), // Define API endpoints here
});

export default baseApi;
