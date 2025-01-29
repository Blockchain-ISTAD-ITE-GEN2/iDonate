import {OrganizationEventType} from "@/difinitions/dto/Organization-event";

export type EventType = {
  uuid?:string;
  name: string;
  description: string;
  startDate:string;
  endDate:string;
  total_amount: number;
  total_donor: number;
  // date?: string;
  key?: number;
  category?: {
    name:string;
  };
  organization?:OrganizationEventType;
  images: string[];
};


