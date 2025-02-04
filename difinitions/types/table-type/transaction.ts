export type TransactionType = {
  date?: string;
  donor?: string;
  email?: string;
  event?: {
    name: string;
  } | null;
  organization?: {
    name: string;
  } | null;
  amount?: number;
  image?: string;
  description?: string;
  order_date?: string;
  end_date?: string;
  avatar?: string;
  username?: string;
  donationAmount?: string;
  timestamp?: string;
};
