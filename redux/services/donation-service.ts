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
      invalidatesTags: [{ type: "event", id: "LIST" }],
    }),
    generateQrCode: builder.mutation({
      query: (qr: string) => ({
        url: "/qr/generate", // Corrected URL (no extra `api`)
        method: "POST",
        body: qr,
      }),
    }),
    
  }),
});

export const { useMakeDonationMutation, useGenerateQrCodeMutation } = donationApi;
