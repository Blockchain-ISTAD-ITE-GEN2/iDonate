import { idonateApi } from "@/redux/api";

export const organizatioApi = idonateApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder.query({
      query: () => `/organizations`,
      providesTags: [{ type: "organization", id: "LIST" }],
    }),
  }),
});

export const { useGetOrganizationsQuery } = organizatioApi;
