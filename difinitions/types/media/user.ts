export type UserRole = "donor" | "recipient" | "admin";
export type UserStatus = "active" | "inactive" | "pending" | "suspended";

export interface UserProfile {
  avatar?: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
}

export interface User {
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
}

export interface CreateUserData {
  name: string;
  email: string;
  role: UserRole;
  password: string;
  profile?: Partial<UserProfile>;
}

// this is create Organization user data
export interface CreateOrganizationUserData {
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  status?: UserStatus;
  profile?: Partial<UserProfile>;
}

// this is for donor user response
export interface DonorUserResponse {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  avarar?: string;
}

// this is for organization user response
export interface OrganizationUserResponse {
  name: string;
  descritpion: string;
  email: string;
  phonenumber: string;
  address: string;
  userRole: string;
}
