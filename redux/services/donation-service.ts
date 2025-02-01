import { DonationType } from "@/difinitions/types/donation/donation";
import { idonateApi } from "@/redux/api";

export const donationApi = idonateApi.injectEndpoints({
  endpoints: (builder) => ({
    makeDonation: builder.mutation({
      query: (donation: DonationType) => ({
        url: "/donation/donate",
        method: "POST",
        body: donation,
      }),
      invalidatesTags: [{ type: "donation", id: "LIST" }],
    }),
    generateQrCode: builder.mutation({
      query: (qr: string) => ({
        url: "/qr/generate", // Corrected URL (no extra `api`)
        method: "POST",
        body: qr,
      }),
    }),
    getOrgTransactions: builder.query({
      query: (orgUuid: string) => `/donation/org-transactions/${orgUuid}`,
      providesTags: [{ type: "donation", id: "LIST" }],
    }),
  }),
});

export const {
  useMakeDonationMutation,
  useGenerateQrCodeMutation,
  useGetOrgTransactionsQuery,
} = donationApi;
