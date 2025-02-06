import { EventType } from "../event/EventType";
import { OrganizationType } from "../organization/OrganizationType";

// export type TransactionType = {
//   avatar?: string;
//   donationAmount?: string;
//   timestamp?: string;
//   event?: EventType;
//   username?: string;
//   organization?: OrganizationType
// };
export type TransactionType = {
  date?: string;
  donor?: string;
  email?: string;
  event?: EventType;
  username?: string;
  organization?: OrganizationType;
  amount?: number;
  image?: string;
  description?: string;
  order_date?: string;
  end_date?: string;
  avatar?: string;
  donationAmount?: string;
  timestamp?: string;
};
