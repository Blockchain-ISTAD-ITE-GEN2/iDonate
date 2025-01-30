import {OrganizationEventType} from "@/difinitions/dto/Organization-event";

export type EventType = {
  uuid? :string;
  name: string;
  description: string;
  location: string;
  startDate:string;
  endDate:string;
  // date?: string;
  key?: number;
  category?: {
    name:string;
  };
  organization?:OrganizationEventType;
  images: string[];
  currentRaised?: number;
  totalDonors?: number;
  isDraft: boolean;
  timezone?: string
};


