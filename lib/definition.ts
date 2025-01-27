import { Key, ReactNode } from "react";

export type ModalProps = {
  onClose: () => void;
  children: ReactNode;
};

export type TableRow = {
  product: string;
  date: string;
};

export type TableProps = {
  data: TableRow[];
};

// user login request
export interface LoginValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// user verify request
export type VerifyValues = {
  token: string;
};

export type SignupResponse = {
  message?: string;
  data?: string;
  token?: string;
};

// user signup request
export interface SignupValues {
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  email: string;
  username: string;
  password: string;
  dateOfBirth: string;
}

// user forget password request
export interface ResetPasswordValues {
  newPassword: string;
  confirmPassword: string;
}

// user reset password request
export interface ForgetPasswordValues {
  email: string;
}

// Profile type
export type ProfilesType = {
  name: string;
  position: string;
  quote: string;
  fb_social: string;
  git_hub: string;
  git_lab: string;
};

// Change password
export type ChangePasswordType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
// Edit Profile Type
export type EditprofileType = {
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  avatar: string;
  phoneNumber: string;
  dateOfBirth: string;
};
export type userProfileinfoType = {
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  position: string;
  role: [string];
  isActive: boolean;
  isFavourite: boolean;
  createdAt: string;
  updatedAt: string;
  address: string;
};

// Review type
export type ReviewsType = {
  description: string;
  user: object;
};

// User type
export type UserType = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: string;
  position: string;
  role: [string];
};
// Upload file type
export type UploadFileType = {
  schemaName: string;
  description: string;
  fileName: string;
  fileUpload: string;
};

export type UpdateProfileImageType = {
  image: string;
};

// user data type
export type UserDataType = {
  id: string;
  projectName: string;
  owner: string;
  isActive: boolean;
  isFavourite: boolean;
  data: {
    tableName?: string;
  };
};

export type UploadImageResponse = {
  name: string;
  contentType: string;
  size: number;
  uri: any;
  extension: string;
};
