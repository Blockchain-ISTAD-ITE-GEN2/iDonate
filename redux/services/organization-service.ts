import { idonateApi } from "@/redux/api";

export const organizatioApi = idonateApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder.query({
      query: () => `/organizations`,
      providesTags: [{ type: "organization", id: "LIST" }],
    }),
    createOrganizations: builder.mutation({
      query: (newOrganization) => ({
        url: "/organizations",
        method: "POST",
        body: newOrganization,
      }),
      invalidatesTags: [{ type: "organization", id: "LIST" }],
    }),
    editOrganizations: builder.mutation({
      query: ({ uuid, updatedData }) => ({
        url: `/organizations/${uuid}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: [{ type: "organization", id: "LIST" }],
    }),
    deleteOrganizations: builder.mutation({
      query: (uuid) => ({
        url: `/organizations/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "organization", id: "LIST" }],
    }),
    createOrganization: builder.mutation({
      query: ({ newOrganization, uuid }) => ({
        url: `/organizations/${uuid}`,
        method: "POST",
        body: newOrganization,
      }),
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useCreateOrganizationsMutation,
  useEditOrganizationsMutation,
  useDeleteOrganizationsMutation,
  useCreateOrganizationMutation,
} = organizatioApi;
