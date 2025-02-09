import { BigDecimal } from "effect/BigDecimal";

export type ReceiptRequest = {
  userUuid: string;
  eventUuid: string;
  remark?: string;
  amount: number;
};

export type ReceiptResponse = {
  receiptId: string;
  donorName: string;
  donorEmail: string;
  eventName: string;
  amount: number;
  message: string;
  date: string;
  transactionId: string;
  organizationName: string;
  organizationContact: string;
};
