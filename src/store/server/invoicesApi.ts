import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseQuery, IErr } from "./baseQuery";

export const invoicesApi = createApi({
  reducerPath: "invoicesApi",
  baseQuery: fetchBaseQuery(baseQuery) as unknown as BaseQueryFn<
    string | FetchArgs,
    unknown,
    IErr,
    {}
  >,
  tagTypes: ["Invoices"],
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: (arg) => ({
        url: `/invoices`,
        method: "get",
        ...arg,
      }),
      providesTags: ["Invoices"],
    }),

    addInvoices: builder.mutation({
      query: (body) => ({
        url: `/invoices/new`,
        method: "post",
        body,
      }),
      invalidatesTags: ["Invoices"],
    }),

    getInvoiceById: builder.query({
      query: (id) => ({
        url: `/invoices/${id}`,
        method: "get",
      }),
      providesTags: ["Invoices"],
    }),

    getInvoicesInventory: builder.query({
      query: (arg) => ({
        url: `/invoices/inventory`,
        method: "get",
        ...arg,
      }),
      providesTags: ["Invoices"],
    }),

    getInvoicesProducts: builder.query({
      query: (arg) => ({
        url: `/invoices/products`,
        method: "get",
        ...arg,
      }),
      providesTags: ["Invoices"],
    }),

    getInvoicesCategories: builder.query({
      query: (arg) => ({
        url: `/invoices/categories`,
        method: "get",
        ...arg,
      }),
      providesTags: ["Invoices"],
    }),

    refundInvoice: builder.mutation({
      query: (body) => ({
        url: `/invoices/refund`,
        method: "post",
        body,
      }),

      invalidatesTags: ["Invoices"],
    }),

    invoicesProducts: builder.mutation({
      query: (body) => ({
        url: `/invoices/products`,
        method: "post",
        body,
      }),

      invalidatesTags: ["Invoices"],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useAddInvoicesMutation,
  useGetInvoiceByIdQuery,
  useGetInvoicesInventoryQuery,
  useGetInvoicesProductsQuery,
  useGetInvoicesCategoriesQuery,
  useRefundInvoiceMutation,
  useInvoicesProductsMutation,
} = invoicesApi;
