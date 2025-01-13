export type UserRole = "donor" | "organization";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  image?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ErrorPayload {
  error: {
    status: number;
    message: string;
  };
}