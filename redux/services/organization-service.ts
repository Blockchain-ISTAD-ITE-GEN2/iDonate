import { idonateApi } from "@/redux/api";

export const organizatioApi = idonateApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder.query({
      query: () => `/organizations`,
      query: () => `/organizations`,
      providesTags: [{ type: "organization", id: "LIST" }],
    }),

    getOrganizationByuuid: builder.query({
      query: (uuid) => `/organizations/${uuid}`,
      providesTags: [{ type: "organization"}],
    }),

    getPendingOrganizations: builder.query({
      query: () => `/organizations/get-pending-organizations`,
      query: () => `/organizations/get-pending-organizations`,
      providesTags: [{ type: "organization", id: "LIST" }],
    }),

    createOrganizations: builder.mutation({
      query: ({uuid,newOrganization}) => ({
          url: `/organizations/${uuid}`,
          method: 'POST',
          body: newOrganization,
      }),
      invalidatesTags: [{ type: "organization" }],
    }),
    editOrganizations: builder.mutation({
      query: ({uuid, updatedData}) => ({
          url: `/organizations/${uuid}`,
          method: 'PUT',
          body: updatedData,
      }),
      invalidatesTags: [{ type: "organization", id: "LIST" }],
    }),

    editImagePaymentOrganizations: builder.mutation({
      query: ({orgUuid, upload}) => ({
          url: `/organizations/${orgUuid}/upload-qr`,
          method: 'PUT',
          body: upload,
      })
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
  useGetOrganizationByuuidQuery,
} = organizatioApi;
