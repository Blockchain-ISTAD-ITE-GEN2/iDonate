import { idonateApi } from "../api";
import {
  EditprofileType,
  ChangePasswordType,
  UpdateProfileImageType,
  userProfileinfoType,
} from "@/lib/definition";

export type user = {
  uuid: string | null;
};

export const userProfileSettingApi = idonateApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: `/api/v1/users/me`,
      }),

      providesTags: ["userProfile"],
    }),

    // update user info
    updateUserProfile: builder.mutation<
      any,
      { uuid: string; updatedUserProfile: userProfileinfoType }
    >({
      query: ({ uuid, updatedUserProfile }) => ({
        url: `/api/v1/users/${uuid}`,
        method: "PATCH",
        body: updatedUserProfile,
      }),
      invalidatesTags: ["userProfile"],
    }),
    // update avatar user
    updateAvatar: builder.mutation<
      any,
      { uuid: any; updatedProfileImage: UpdateProfileImageType }
    >({
      query: ({ uuid, updatedProfileImage }) => ({
        url: `/api/v1/users/${uuid}/profile-image`,
        method: "PUT",
        body: updatedProfileImage,
      }),
      invalidatesTags: ["userProfile"],
    }),

    // update password user
    updatePassWords: builder.mutation<
      any,
      { uuid: string; updatedPassword: ChangePasswordType }
    >({
      query: ({ uuid, updatedPassword }) => ({
        url: `/api/v1/users/${uuid}/change-password`,
        method: "PATCH",
        body: updatedPassword,
      }),
      invalidatesTags: ["userProfile"],
    }),
    getUserByUuid: builder.query<any, any>({
      query: (uuid) => ({
        url: `/api/v1/users/${uuid}/me`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdatePassWordsMutation,
  useUpdateAvatarMutation,
  useGetUserByUuidQuery,
} = userProfileSettingApi;
