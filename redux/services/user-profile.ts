import { idonateApi } from "../api";
import {
  EditprofileType,
  ChangePasswordType,
  UpdateProfileImageType,
  userProfileinfoType,
} from "@/lib/definition";

export type User = {
  uuid: string | null;
};

export const userProfileSettingApi = idonateApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get user profile
    getUserProfile: builder.query<userProfileinfoType, void>({
      query: () => ({
        url: `/api/v1/users/me`,
      }),
      providesTags: ["userProfile"],
    }),

    // Update user profile
    updateUserProfile: builder.mutation<
      userProfileinfoType,
      { uuid: string; updatedUserProfile: userProfileinfoType }
    >({
      query: ({ uuid, updatedUserProfile }) => ({
        url: `/api/v1/users/${uuid}`,
        method: "PATCH",
        body: updatedUserProfile,
      }),
      invalidatesTags: ["userProfile"],
    }),

    // Update user avatar
    updateAvatar: builder.mutation<
      { avatar: string },
      { uuid: string; updatedProfileImage: UpdateProfileImageType }
    >({
      query: ({ uuid, updatedProfileImage }) => ({
        url: `/api/v1/users/${uuid}/upload-image`,
        method: "PUT",
        body: updatedProfileImage,
      }),
      invalidatesTags: ["userProfile"],
    }),

    // Update user password
    updatePassWords: builder.mutation<
      void,
      { uuid: string; updatedPassword: ChangePasswordType }
    >({
      query: ({ uuid, updatedPassword }) => ({
        url: `/api/v1/users/${uuid}/change-password`,
        method: "PATCH",
        body: updatedPassword,
      }),
      invalidatesTags: ["userProfile"],
    }),

    // Get user by UUID
    getUserByUuid: builder.query<userProfileinfoType, string>({
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