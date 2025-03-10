import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseQuery, IErr } from "./baseQuery";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery(baseQuery) as unknown as BaseQueryFn<
    string | FetchArgs,
    unknown,
    IErr,
    {}
  >,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => {
        return {
          url: `/products`,
          method: "get",
          ...params,
        };
      },
      providesTags: ["Products"],
    }),

    getAllProducts: builder.mutation({
      query: (arg) => {
        return {
          url: `/products`,
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${arg.token}`,
          },
          ...arg,
        };
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetAllProductsMutation } = productsApi;
