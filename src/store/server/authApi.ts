import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery, multipartHeader } from "./baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery(baseQuery),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    createAccount: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
    }),

    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/reset_password/send",
        method: "POST",
        body: credentials,
      }),
    }),

    resetPasswordOtp: builder.mutation({
      query: (credentials) => ({
        url: "/reset_password/save",
        method: "POST",
        body: credentials,
      }),
    }),

    updateProfileData: builder.mutation({
      query: (body) => ({
        url: `/profile/update`,
        method: "post",
        body,
        headers: multipartHeader,
      }),

      invalidatesTags: ["Profile"],
    }),

    getUserInfo: builder.query({
      query: () => "/profile",
      providesTags: ["Profile"],
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateAccountMutation,
  useResetPasswordMutation,
  useResetPasswordOtpMutation,

  useUpdateProfileDataMutation,
  useGetUserInfoQuery,
} = authApi;
