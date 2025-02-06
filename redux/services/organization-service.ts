import { idonateApi } from "@/redux/api";

export const organizatioApi = idonateApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder.query({
      query: () => `/organizations`,

      providesTags: [{ type: "organization", id: "LIST" }],
    }),

    getOrganizationByuuid: builder.query({
      query: (uuid) => `/organizations/${uuid}/get-by-uuid`,
      providesTags: [{ type: "organization" }],
    }),

    getOrganizationByUser: builder.query({
      query: (userUuid) => `/organizations/${userUuid}`,
      providesTags: [{ type: "organization" }],
    }),

    getPendingOrganizations: builder.query({
      query: () => `/organizations/get-pending-organizations`,
      providesTags: [{ type: "organization", id: "LIST" }],
    }),

    createOrganizations: builder.mutation({
      query: ({ uuid, newOrganization }) => ({
        url: `/organizations/${uuid}`,
        method: "POST",
        body: newOrganization,
      }),
      invalidatesTags: [{ type: "organization" }],
    }),
    editOrganizations: builder.mutation({
      query: ({ uuid, updatedData }) => ({
        url: `/organizations/${uuid}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: [{ type: "organization", id: "LIST" }],
    }),

    editImagePaymentOrganizations: builder.mutation({
      query: ({ orgUuid, upload }) => ({
        url: `/organizations/${orgUuid}/upload-qr`,
        method: "PUT",
        body: upload,
      }),
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
      invalidatesTags: [{ type: "organization" }]
    }),
    useUploadOrganizationImage: builder.mutation({
      query: ({ orgUuid, fileData }) => ({
        url: `/organizations/${orgUuid}/upload-org-image`,
        method: "PUT",
        body: fileData,  // No need to stringify FormData
        formData: true,  // Ensures proper handling of FormData
      }),
      invalidatesTags: [{ type: "organization" }]
    }),
    setBankAccount: builder.mutation({
      query: ({ orgUuid, bankAccount }) => ({
        url: `/organizations/set-bank-account/${orgUuid}`,
        method: "PUT",
        body: bankAccount,
      }),
      invalidatesTags: [{ type: "organization" }]
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
  useGetOrganizationByUserQuery,
  useGetPendingOrganizationsQuery,
  useUseUploadOrganizationImageMutation,
  useSetBankAccountMutation,
} = organizatioApi;
