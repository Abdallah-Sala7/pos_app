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
  tagTypes: ["Invoices"],
  endpoints: (builder) => ({
    addInvoice: builder.mutation({
      query: (body) => ({
        url: `/invoices/add`,
        method: "post",
        body,
      }),
      invalidatesTags: ["Invoices"],
    }),
  }),
});

export const { useAddInvoiceMutation } = ordersApi;
