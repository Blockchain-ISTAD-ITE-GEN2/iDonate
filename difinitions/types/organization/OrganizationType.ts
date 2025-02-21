import { UserResponse, UserType } from "@/difinitions/types/user/UserType";

export type OrganizationRequest = {
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
};

export type OrganizationResponse = {
  uuid: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  isApproved: boolean;
  user: UserResponse;
};

export type OrganizationType = {
  uuid?: string;
  name: string;
  description?: string | null;
  email: string;
  phone: string;
  address?: string;
  image?: string | File | null;
  bankAccountNumber?: string | null;
  isApproved: boolean;
  fileReferences?: string | File | null;
  user?: UserType;
  bio?: string;
  onClick?: () => void;
};
