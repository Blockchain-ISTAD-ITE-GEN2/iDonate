import { UpdateProfileImageType } from "@/lib/definition";
import { idonateApi } from "../api";
import { headers } from "next/headers";

export const mediasApi = idonateApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadSingleMedia: builder.mutation({
      query: (file) => {
        console.log("log file:", file);
        let formData = new FormData();
        formData.append("file", file);
        // formData.entries();
        console.log("log entries file: ", formData.append("file", file));
        return {
          url: `/api/v1/media/upload-single`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["media"],
    }),

    // uploadSingleMedia: builder.mutation({
    //     query: (file) => {
    //         // Log the request body for debugging
    //         console.log('Request Body:', file);

    //         // Create a new FormData object and append the uploaded media
    //         let formData = new FormData();
    //         formData.append('file', file); // Assuming uploadedMedia is a File object
    //         console.log("form data: ", data)
    //         // Return the fetch options
    //         return {
    //         url: `/api/v1/medias/upload-single`,
    //             method: 'POST',
    //             // prepareHeaders: (headers: { set: (arg0: string, arg1: string) => void; }) => {
    //             //     headers.set("Content-type", "multipart/form-data")
    //             //     return headers
    //             // },
    //             body: formData,
    //         };
    //     },
    // }),

    getMediasName: builder.query<any, { mediaName: string }>({
      query: (mediaName) => ({
        url: `/api/v1/media/get-by-name/${mediaName}`,
      }),
    }),
  }),
});

export const { useUploadSingleMediaMutation, useGetMediasNameQuery } =
  mediasApi;
