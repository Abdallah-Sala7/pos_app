import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseQuery, IErr, multipartHeader } from "./baseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery(baseQuery) as unknown as BaseQueryFn<
    string | FetchArgs,
    unknown,
    IErr,
    {}
  >,
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => "/profile",
    }),

    updateProfileData: builder.mutation({
      query: (body) => ({
        url: `/profile/update`,
        method: "post",
        body,
        headers: multipartHeader,
      }),
    }),

    getDashboard: builder.query({
      query: () => "/dashboard",
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useGetDashboardQuery,
  useUpdateProfileDataMutation,
} = userApi;
