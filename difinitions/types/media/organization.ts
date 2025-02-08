import { UserType } from '@/lib/definition';
import { Phone } from 'lucide-react';
export type OrganizationParam = {
  uuid?: string;
  image: File | string | null;
  name: string;
  description: string | null;
  key?: number | string;
  address?: string;
  email: string;
  phone: string;
  bankAccountNumber: string | null;
  isApproved: boolean;
  fileReferences: string;
  bio?: string;
  user: UserType;
  onClick: () => void;
};

export type EventTypeParam = {
  image: string;
  title: string;
  description: string;
  total_amount: number;
  total_donor: number;
};
