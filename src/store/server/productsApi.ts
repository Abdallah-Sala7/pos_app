import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseQuery, IErr, multipartHeader } from "./baseQuery";

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
          ...arg,
        };
      },
    }),

    addProducts: builder.mutation({
      query: (body) => {
        return {
          url: `/products/add`,
          method: "post",
          body,
          headers: multipartHeader,
        };
      },
      invalidatesTags: ["Products"],
    }),

    updateProducts: builder.mutation({
      query: (body) => {
        return {
          url: `/products/update`,
          method: "post",
          body,
          headers: multipartHeader,
        };
      },
      invalidatesTags: ["Products"],
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Products"],
    }),

    updateProductActivation: builder.mutation({
      query: (id) => ({
        url: `/products/update_is_active/${id}`,
        method: "post",
      }),

      invalidatesTags: ["Products"],
    }),

    updateProductStatus: builder.mutation({
      query: (body) => ({
        url: `/products/update_status`,
        method: "post",
        body,
      }),

      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/delete/${id}`,
        method: "post",
      }),

      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductsMutation,
  useUpdateProductsMutation,
  useGetProductByIdQuery,
  useUpdateProductActivationMutation,
  useUpdateProductStatusMutation,
  useDeleteProductMutation,
  useGetAllProductsMutation,
} = productsApi;
