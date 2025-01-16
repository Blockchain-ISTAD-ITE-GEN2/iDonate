import { idonateApi } from "@/redux/api";

export const categoryApi = idonateApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `/categories`,
      providesTags: [{ type: "category", id: "LIST" }],
    }),
    createCategories: builder.mutation({
      query: (newCategory) => ({
        url: "/categories",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: [{ type: "category", id: "LIST" }],
    }),
    editCategories: builder.mutation({
      query: ({ uuid, updatedData }) => ({
        url: `/categories/${uuid}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: [{ type: "category", id: "LIST" }],
    }),
    deleteCategories: builder.mutation({
      query: (uuid) => ({
        url: `/categories/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "category", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoriesMutation,
  useEditCategoriesMutation,
  useDeleteCategoriesMutation,
} = categoryApi;
