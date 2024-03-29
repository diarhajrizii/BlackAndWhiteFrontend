import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v1",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    fetchUserData: builder.query({
      query: () => "authentication/user",
    }),
    fetchBrands: builder.query({
      query: (type) => `panels/brands?type=${type}`,
    }),
    fetchColors: builder.query({
      query: () => "panels/colors",
    }),
    fetchNumbers: builder.query({
      query: (type) => `panels/numbers?type=${type}`,
    }),
    fetchTypes: builder.query({
      query: (type) => `panels/types?type=${type}`,
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: "products/products",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useFetchUserDataQuery,
  useFetchBrandsQuery,
  useFetchColorsQuery,
  useFetchNumbersQuery,
  useFetchTypesQuery,
  useAddProductMutation,
} = api;
