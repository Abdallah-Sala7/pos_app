import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseQuery, IErr, multipartHeader } from "./baseQuery";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery(baseQuery) as unknown as BaseQueryFn<
    string | FetchArgs,
    unknown,
    IErr,
    {}
  >,
  tagTypes: ["Expenses", "Analytics", "Documents"],
  endpoints: (builder) => ({
    instancePost: builder.mutation({
      query: ({ url, body }) => ({
        url,
        method: "post",
        body,
      }),
    }),

    getExpenses: builder.query({
      query: (arg) => ({
        url: `/expenses`,
        method: "get",
        ...arg,
      }),
      providesTags: ["Expenses"],
    }),

    addExpenses: builder.mutation({
      query: (body) => ({
        url: `/expenses/add`,
        method: "post",
        body,
        headers: multipartHeader,
      }),

      invalidatesTags: ["Expenses"],
    }),

    getAnalytics: builder.query({
      query: (arg) => ({
        url: `/analytics`,
        method: "get",
        ...arg,
      }),
      providesTags: ["Analytics"],
    }),

    getExportedFile: builder.mutation({
      query: ({ url, params, method = "get" }) => ({
        url,
        method,
        params,
        responseHandler: (response) => response.blob(),
      }),
    }),

    getDocuments: builder.query({
      query: (arg) => ({
        url: `/documents`,
        method: "get",
        ...arg,
      }),
      providesTags: ["Documents"],
    }),
  }),
});

export const {
  useInstancePostMutation,
  useGetExpensesQuery,
  useAddExpensesMutation,
  useGetAnalyticsQuery,
  useGetExportedFileMutation,
  useGetDocumentsQuery,
} = mainApi;
