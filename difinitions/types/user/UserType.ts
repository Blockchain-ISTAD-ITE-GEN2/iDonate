export type UserRole = "donor" | "recipient" | "admin";
export type UserStatus = "active" | "inactive" | "pending" | "suspended";

export type RegistrationRequest = {
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  email: string;
  username: string;
  password: string;
  dateOfBirth: Date;
};

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  gender: string;
  phoneNumber: string;
  email: string;
  username: string;
  password?: string;
  dateOfBirth: string;
  isActive: boolean;
  lastLogin?: Date;
  role?: UserRole;
  avartar?: string;
};

export type UserProfile = {
  avatar?: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
};

export type VerifyToken = {
  token: string;
};

export type RegistrationResponse = {
  message: string;
  code: number;
  status: boolean;
  timeStamp: Date;
  data: string;
  token: string;
  user: UserResponse;
};

export type UserUpdatRequest = {
  firstName: string;
  lastName: string;
  gender: string;
  username: string;
  phoneNumber: string;
  dateOfBirth: Date;
};

export type UserDobRequest = {
  birthday: Date;
};

export type UserForgetPassword = {
  email: string;
};

export type resetPassword = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};

export type UserResponse = {
  uuid: string;
  firstName: string;
  lastName: string;
  gender: string;
  username: string;
  password: string;
  phoneNumber: string;
  email: string;
  avatar: string;
  dateOfBirth: Date;
  isProfileVisibility: boolean;
  isEmailVerified: boolean;
};

export type RoleResponse = {
  name: string;
};

export type UserDetailResponse = {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  username: string;
  avatar: string;
  createdAt: string;
  isBlocked: boolean;
  isEmailVerified: boolean;
  lastLoginAt: Date;
  role: RoleResponse[];
};

export type UserType = {
  uuid: string;
  firstName: string;
  lastName: string;
  gender?: string;
  username: string;
  password?: string;
  phoneNumber?: string;
  email: string;
  avatar?: string | null;
  dateOfBirth?: string | null;
  address?: string | null;
  isProfiledVisibility: boolean;
  isEmailVerified: boolean;
};
