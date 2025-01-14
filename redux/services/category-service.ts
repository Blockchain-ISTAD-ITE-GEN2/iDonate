import { idonateApi } from "@/redux/api";

export const categoryApi = idonateApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `/categories`,
      providesTags: [{ type: "category", id: "LIST" }],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
