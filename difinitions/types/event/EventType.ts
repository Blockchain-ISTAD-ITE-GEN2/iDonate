import { CategoryType } from "../components-type/CategoryType";
import { UploadedFile } from "../fileupload";
import { OrganizationType } from "../organization/OrganizationType";

export type EventType = {
  uuid?: string;
  name: string;
  media: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  // date?: string;
  key?: number;
  category?: CategoryType;
  organization?: OrganizationType;
  images: File[] | string[];
  currentRaised?: number;
  totalDonors?: number;
  isDraft: boolean;
  isVisible: boolean;
  timezone?: string;
};
