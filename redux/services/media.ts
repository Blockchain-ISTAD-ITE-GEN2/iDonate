import { idonateApi } from "../api";

export const mediasApi = idonateApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadSingleMedia: builder.mutation({
      query: (fileData) => ({
        url: `media/upload-single`,
        method: "POST",
        body: fileData,
      }),
      invalidatesTags: ["media"],
    }),
    uploadMultipleMedia: builder.mutation({
      query: (fileData) => ({
        url: `media/upload-multiple`,
        method: "POST",
        body: fileData,
      }),
      invalidatesTags: ["media"],
    }),

    getMediasName: builder.query<any, { mediaName: string }>({
      query: (mediaName) => ({
        url: `/media/get-by-name/${mediaName}`,
      }),
    }),
  }),
});

export const {
  useUploadSingleMediaMutation,
  useGetMediasNameQuery,
  useUploadMultipleMediaMutation,
} = mediasApi;
