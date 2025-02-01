import { BigDecimal } from "effect/BigDecimal";
export type ReceiptResponse = {
  receiptId: string;
  donorName: string;
  donorEmail: string;
  eventName: string;
  amount: BigDecimal;
  message: string;
  date: Date;
  organizationName: string;
  organizationContact: string;
};
