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
    uploadImageByEventUuid: builder.mutation({
      query: ({ fileData, uuid }) => ({
        url: `/events/${uuid}/upload-image`,
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
    deleteEventMedia: builder.mutation({
      query: ({uuid, mediaName = [""]}) => ({
        url: `/events/${uuid}/delete-media-by-name`,
        method: "PUT",
        body: { mediaName },
      }),
      invalidatesTags: ["media"],
    }),
    addEventMedia: builder.mutation({
      query: ({uuid, mediaName = [""]}) => ({
        url: `/events/${uuid}/add-more-media`,
        method: "PUT",
        body: { mediaName },
      }),
      invalidatesTags: ["media"],
    }),
  }),
});

export const {
  useUploadSingleMediaMutation,
  useGetMediasNameQuery,
  useUploadMultipleMediaMutation,
  useUploadImageByEventUuidMutation,
  useDeleteEventMediaMutation,
  useAddEventMediaMutation,
} = mediasApi;
