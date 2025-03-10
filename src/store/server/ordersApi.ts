import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseQuery, IErr } from "./baseQuery";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery(baseQuery) as unknown as BaseQueryFn<
    string | FetchArgs,
    unknown,
    IErr,
    {}
  >,
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (arg) => ({
        url: `/orders`,
        method: "get",
        ...arg,
      }),
      providesTags: ["Orders"],
    }),

    addOrder: builder.mutation({
      query: (body) => ({
        url: `/orders/new`,
        method: "post",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),

    getOrderById: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: ["Orders"],
    }),

    updateOrder: builder.mutation({
      query: (body) => ({
        url: `/orders/update`,
        method: "post",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "post",
      }),

      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useAddOrderMutation,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;
