import { idonateApi } from "@/redux/api";

export const organizatioApi = idonateApi.injectEndpoints({
  endpoints: (builder) => ({
    // getOrganizations: builder.query({
    //   query: () => `/api/v1/organizations`,
    //   providesTags: [{ type: "organization", id: "LIST" }],
    // }),
    getOrganizations: builder.query({
      query: () => `/api/v1/organizations`,
      providesTags: [{ type: "organization", id: "LIST" }],
    }),
    createOrganizations: builder.mutation({
      query: (newOrganization) => ({
        url: "/api/v1/organizations",
        method: "POST",
        body: newOrganization,
      }),
      invalidatesTags: [{ type: "organization", id: "LIST" }],
    }),
    editOrganizations: builder.mutation({
      query: ({ uuid, updatedData }) => ({
        url: `/api/v1/organizations/${uuid}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: [{ type: "organization", id: "LIST" }],
    }),
    deleteOrganizations: builder.mutation({
      query: (uuid) => ({
        url: `/api/v1/organizations/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "organization", id: "LIST" }],
    }),
  }),
});

export const { useGetOrganizationsQuery } = organizatioApi;
