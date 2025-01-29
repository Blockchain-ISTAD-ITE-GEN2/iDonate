export type DonationType = {
  donationEventID: string;
  donor: string;
  amount: number;
  recipient: string;
  acquiringBank: string;
  currency: string;
  city: string;
  timezone: string
  // visibily: boolean;
};


export type TransactionDataType = {
  responseCode: number;
  esponseMessage: string;
  data:{
    hash: string;
    fromAccountId: string;
    toAccountId: string;
    currency: string;
    amount: number;
    description: string;
    createdDateMs: number;
    acknowledgedDateMs: number;
  }
};