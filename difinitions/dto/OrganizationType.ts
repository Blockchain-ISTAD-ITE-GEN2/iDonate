import { UserResponse } from "./UserType";

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
