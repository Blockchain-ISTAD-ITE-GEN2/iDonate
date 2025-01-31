import { UpdateProfileImageType } from "@/lib/definition";
import { idonateApi } from "../api";
import { headers } from "next/headers";

export const mediasApi = idonateApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadSingleMedia: builder.mutation({
      query: (file) => {
        console.log("log file:", file);
        // let formData = new FormData();
        // formData.append("file",file);
        // formData.entries();
        // console.log("log entries file: ",formData.append('file',file));
        return {
          url: `/media/upload-single`,
          method: "POST",
          body: file,
        };
      },
      invalidatesTags: ["media"],
    }),

    getMediasName: builder.query<any, { mediaName: string }>({
      query: (mediaName) => ({
        url: `/media/get-by-name/${mediaName}`,
      }),
    }),
  }),
});

export const { useUploadSingleMediaMutation, useGetMediasNameQuery } =
  mediasApi;
