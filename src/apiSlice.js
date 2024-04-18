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
    saveColorData: builder.mutation({
      query: (colorData) => ({
        url: "panels/color",
        method: "POST",
        body: colorData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    saveBrandData: builder.mutation({
      query: (brandData) => ({
        url: "/panels/brand",
        method: "POST",
        body: brandData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    saveNumberData: builder.mutation({
      query: (numberData) => ({
        url: "/panels/number",
        method: "POST",
        body: numberData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    saveSpecificTypeData: builder.mutation({
      query: (typeData) => ({
        url: "/panels/type",
        method: "POST",
        body: typeData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    saveLocationsData: builder.mutation({
      query: (locationData) => ({
        url: "/panels/location",
        method: "POST",
        body: locationData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    editColorData: builder.mutation({
      query: (colorData) => ({
        url: "/panels/color",
        method: "PUT",
        body: colorData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    editBrandData: builder.mutation({
      query: (brandData) => ({
        url: "/panels/brand",
        method: "PUT",
        body: brandData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    editNumberData: builder.mutation({
      query: (numberData) => ({
        url: "/panels/number",
        method: "PUT",
        body: numberData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    editTypeData: builder.mutation({
      query: (typeData) => ({
        url: "/panels/type",
        method: "PUT",
        body: typeData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    editLocationData: builder.mutation({
      query: (locationData) => ({
        url: "/panels/location",
        method: "PUT",
        body: locationData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    deleteItem: builder.mutation({
      query: (data) => ({
        url: `/panels/${data.endpoint}`,
        method: "DELETE",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    transferProducts: builder.mutation({
      query: ({ ids, location }) => ({
        url: "/products/transfer",
        method: "PUT",
        body: { ids, location },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    transactionUpdate: builder.mutation({
      query: (data) => ({
        url: "/transactions",
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    addTransaction: builder.mutation({
      query: (data) => ({
        url: "/transactions",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    fetchPanelData: builder.query({
      queryFn: (endpoint) => fetchPanelData(endpoint),
    }),
    // Define other endpoints as needed
  }),
});

export const {
  useFetchUserDataQuery,
  useFetchBrandsQuery,
  useFetchColorsQuery,
  useFetchNumbersQuery,
  useFetchTypesQuery,
  useAddProductMutation,
  useSaveColorDataMutation,
  useSaveBrandDataMutation,
  useSaveNumberDataMutation,
  useSaveSpecificTypeDataMutation,
  useSaveLocationsDataMutation,
  useEditColorDataMutation,
  useEditBrandDataMutation,
  useEditNumberDataMutation,
  useEditTypeDataMutation,
  useEditLocationDataMutation,
  useDeleteItemMutation,
  useTransferProductsMutation,
  useTransactionUpdateMutation,
  useAddTransactionMutation,
  useFetchPanelDataQuery,
} = api;

const fetchPanelData = async (endpoint) => {
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching panel data:", error);
    return [];
  }
};
