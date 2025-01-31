import { OrganizationType } from "../organization/OrganizationType";

export type EventType = {
  uuid?: string;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  // date?: string;
  key?: number;
  category?: {
    name: string;
  };
  organization?: OrganizationType;
  images: string[];
  currentRaised?: number;
  totalDonors?: number;
  isDraft: boolean;
  timezone?: string;
};
