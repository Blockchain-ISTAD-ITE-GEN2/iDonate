import { OrganizationResponse } from "./OrganizationType";
import {OrganizationEventType} from "@/difinitions/dto/Organization-event";

export type EventRequest = {
  name: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
};

export type EventResponse = {
  uuid: string;
  name: string;
  description: string;
  isVisible: boolean;
  organization: OrganizationResponse;
};
export type EventType = {
  uuid: string;
  name: string;
  description: string;
  startDate:string;
  endDate:string;
  organization: OrganizationEventType;
  total_amount: number;
  total_donor: number;
  key?: number;
  category?: {
    name:string;
  };
  images: string[];
};
