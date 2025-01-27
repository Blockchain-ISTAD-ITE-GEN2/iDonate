import { OrganizationEventType } from "./Organization-event";
import { OrganizationResponse } from "./OrganizationType";

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
  images: [string];
  description: string;
  organization: OrganizationEventType;
  total_amount: number;
  total_donor: number;
  date?: string;
  category?: string;
  [key: string]: any; // Add index signature
};
