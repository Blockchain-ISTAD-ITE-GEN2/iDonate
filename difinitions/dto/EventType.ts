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
  image: string;
  title: string;
  description: string;
  total_amount: number;
  total_donor: number;
  date?: string;
  key?: number;
  category?: string;
};
