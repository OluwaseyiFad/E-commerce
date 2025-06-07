import { getHeaderAuthorization } from "../utils/functions";
import baseApi from "./baseApi";

// User API service for handling user-related operations
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all users
    getUsers: builder.query({
      query: () => ({
        url: "auth/users/",
        headers: getHeaderAuthorization(),
      }),
    }),
    // Fetch a user by ID
    getUserById: builder.query({
      query: (id) => `auth/users/${id}/`,
    }),
    // Fetch the current logged-in user
    getCurrentUser: builder.query({
      query: () => ({
        url: "auth/users/me/",
        headers: getHeaderAuthorization(),
      }),
    }),

    // Fetch the current user's profile
    getCurrrentUserProfile: builder.query({
      query: () => ({
        url: "api/user-profile/me/",
        headers: getHeaderAuthorization(),
      }),
      providesTags: ["UserProfile"],
    }),
    // Update the current user's profile
    patchCurrentUserProfile: builder.mutation({
      query: (body) => ({
        url: `api/user-profile/${body.id}/`,
        method: "PATCH",
        body: body.data,
        headers: getHeaderAuthorization(),
      }),
      invalidatesTags: ["UserProfile"],
    }),
    // Create the current user's profile
    createCurrentUserProfile: builder.mutation({
      query: (data) => ({
        url: "api/user-profile/",
        method: "POST",
        body: data,
        headers: getHeaderAuthorization(),
      }),
      invalidatesTags: ["UserProfile"],
    }),
    // User authentication endpoints
    login: builder.mutation({
      query: (body) => ({
        url: "auth/login/",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "auth/users/",
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export hooks for the defined endpoints
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useRegisterMutation,
  useLoginMutation,
  useGetCurrentUserQuery,
  useGetCurrrentUserProfileQuery,
  usePatchCurrentUserProfileMutation,
  useCreateCurrentUserProfileMutation,
} = userApi;
