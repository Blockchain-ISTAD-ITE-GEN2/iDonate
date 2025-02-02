export type TransactionType = {
  date?: string;
  donor?: string;
  email?: string;
  event?: {
    name: string;
  };
  organization?: {
    name: string;
  };
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
