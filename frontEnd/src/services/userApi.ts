// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
        url: "api/user-profile/",
        headers: getHeaderAuthorization(),
      }),
    }),
    patchCurrentUserProfile: builder.mutation({
      query: (body) => ({
        url: `api/user-profile/${body.id}/`,
        method: "PATCH",
        body: body.data,
        headers: getHeaderAuthorization(),
      }),
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