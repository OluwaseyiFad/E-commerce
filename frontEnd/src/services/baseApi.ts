import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENV } from "@/utils/env";

// Base API configuration for RTK Query
const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.API_URL,
  }),
  tagTypes: ["Cart", "Product", "Orders", "UserProfile"], // Define tag types for caching
  endpoints: () => ({}), // Define API endpoints here
});

export default baseApi;
