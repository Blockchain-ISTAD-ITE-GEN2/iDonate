export type DonationType = {
  eventUuid: string;
  // donor: string;
  amount: number;
  // recipient: string;
  acquiringBank: string;
  currency: string;
  city: string;
  // timezone: string;
  // visibily: boolean;
};

export type DonationDataType = {
  eventUuid: string;
  donor: string;
  amount: number;
  recipient: string;
  acquiringBank: string;
  currency: string;
  city: string;
  // timezone: string;
  visibily: boolean;
};

export type DonationRecordType = {
  donationEventID: string;
  timezone: string;
  amount: number;
};

export type TransactionDataType = {
  responseCode: number;
  responseMessage: string;
  data: {
    hash: string;
    fromAccountId: string;
    toAccountId: string;
    currency: string;
    amount: number;
    description: string;
    createdDateMs: number;
    acknowledgedDateMs: number;
  };
};
