import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseQuery, IErr, multipartHeader } from "./baseQuery";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery(baseQuery) as unknown as BaseQueryFn<
    string | FetchArgs,
    unknown,
    IErr,
    {}
  >,
  tagTypes: ["Users", "Roles"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => {
        return {
          url: `/users`,
          method: "get",
          ...params,
        };
      },
      providesTags: ["Users"],
    }),

    addUsers: builder.mutation({
      query: (body) => {
        return {
          url: `/users/add`,
          method: "post",
          body,
          headers: multipartHeader,
        };
      },
      invalidatesTags: ["Users"],
    }),

    updateUsers: builder.mutation({
      query: (body) => {
        return {
          url: `/users/update`,
          method: "post",
          body,
          headers: multipartHeader,
        };
      },
      invalidatesTags: ["Users"],
    }),

    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["Users"],
    }),

    getRoles: builder.query({
      query: (params) => {
        return {
          url: `/roles`,
          method: "get",
          ...params,
        };
      },
      providesTags: ["Roles"],
    }),

    addRoles: builder.mutation({
      query: (body) => {
        return {
          url: `/roles/add`,
          method: "post",
          body,
          headers: multipartHeader,
        };
      },
      invalidatesTags: ["Roles"],
    }),

    updateRoles: builder.mutation({
      query: (body) => {
        return {
          url: `/roles/update`,
          method: "post",
          body,
          headers: multipartHeader,
        };
      },
      invalidatesTags: ["Roles"],
    }),

    getRoleById: builder.query({
      query: (id) => `/roles/${id}`,
      providesTags: ["Roles"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUsersMutation,
  useGetUserByIdQuery,
  useUpdateUsersMutation,

  useGetRolesQuery,
  useAddRolesMutation,
  useGetRoleByIdQuery,
  useUpdateRolesMutation,
} = usersApi;
