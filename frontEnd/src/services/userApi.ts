import { getHeaderAuthorization } from "../utils/functions";
import baseApi from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "auth/users/",
        headers: getHeaderAuthorization(),
      }),
    }),
    getUserById: builder.query({
      query: (id) => `auth/users/${id}/`,
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: "auth/users/me/",
        headers: getHeaderAuthorization(),
      }),
    }),
    getCurrrentUserProfile: builder.query({
      query: () => ({
        url: "api/user-profile/me/",
        headers: getHeaderAuthorization(),
      }),
      providesTags: ["UserProfile"],
    }),
    patchCurrentUserProfile: builder.mutation({
      query: (body) => ({
        url: `api/user-profile/${body.id}/`,
        method: "PATCH",
        body: body.data,
        headers: getHeaderAuthorization(),
      }),
      invalidatesTags: ["UserProfile"],
    }),
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

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useRegisterMutation,
  useLoginMutation,
  useGetCurrentUserQuery,
  useGetCurrrentUserProfileQuery,
  usePatchCurrentUserProfileMutation,
} = userApi;
