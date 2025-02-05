import { DonationRecordType, DonationType } from "@/difinitions/types/donation/donation";
import { idonateApi } from "@/redux/api";

export const donationApi = idonateApi.injectEndpoints({
  endpoints: (builder) => ({
    makeDonation: builder.mutation({
      query: ({
        donation,
        organizationUuid,
      }: {
        donation: DonationType;
        organizationUuid: string;
      }) => ({
        url: `/fundraising/generate-individual-qr/${organizationUuid}`,
        method: "POST",
        body: donation,
      }),
      invalidatesTags: [{ type: "donation", id: "LIST" }],
    }),
    generateQrCode: builder.mutation({
      query: (qr: string) => ({
        url: "/qr/generate",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { qr }, // Send as a JSON object
      }),
    }),
    
    getOrgTransactions: builder.query({
      query: (orgUuid: string) => `/donation/org-transactions/${orgUuid}`,
      providesTags: [{ type: "donation", id: "LIST" }],
    }),
    saveRecord: builder.mutation({
      query: (record: DonationRecordType) => ({
        url: "/donation/donate",
        method: "POST",
        body: record,
      }),
    }),
  }),
});

export const {
  useMakeDonationMutation,
  useGenerateQrCodeMutation,
  useGetOrgTransactionsQuery,
  useSaveRecordMutation,
} = donationApi;
