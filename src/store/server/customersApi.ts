import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseQuery, IErr } from "./baseQuery";

export const customersApi = createApi({
  reducerPath: "customersApi",
  baseQuery: fetchBaseQuery(baseQuery) as unknown as BaseQueryFn<
    string | FetchArgs,
    unknown,
    IErr,
    {}
  >,
  tagTypes: ["Customers"],

  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: (arg) => ({
        url: `/customers`,
        method: "get",
        ...arg,
      }),
      providesTags: ["Customers"],
    }),

    addCustomer: builder.mutation({
      query: (body) => ({
        url: `/customers/add`,
        method: "post",
        body,
      }),
      invalidatesTags: ["Customers"],
    }),

    getCustomerById: builder.query({
      query: (id) => `/customers/${id}`,
      providesTags: ["Customers"],
    }),

    updateCustomer: builder.mutation({
      query: (body) => ({
        url: `/customers/update`,
        method: "post",
        body,
      }),
      invalidatesTags: ["Customers"],
    }),

    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "post",
      }),

      invalidatesTags: ["Customers"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useAddCustomerMutation,
  useGetCustomerByIdQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customersApi;
