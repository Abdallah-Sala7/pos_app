import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseQuery, IErr, multipartHeader } from "./baseQuery";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery(baseQuery) as unknown as BaseQueryFn<
    string | FetchArgs,
    unknown,
    IErr,
    {}
  >,
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (arg) => ({
        url: `/categories`,
        method: "get",
        ...arg,
      }),
      providesTags: ["Categories"],
    }),

    addCategory: builder.mutation({
      query: (data) => ({
        url: `/categories/add`,
        method: "post",
        body: data,
        headers: multipartHeader,
      }),
      invalidatesTags: ["Categories"],
    }),

    updateCategory: builder.mutation({
      query: (data) => ({
        url: `/categories/update`,
        method: "post",
        body: data,
        headers: multipartHeader,
      }),
      invalidatesTags: ["Categories"],
    }),

    getCategoryById: builder.query({
      query: (id) => `/categories/${id}`,
      providesTags: ["Categories"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "post",
      }),

      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useDeleteCategoryMutation,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} = categoriesApi;
