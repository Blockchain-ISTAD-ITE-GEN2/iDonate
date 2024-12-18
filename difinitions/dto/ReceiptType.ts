import { BigDecimal } from './../../node_modules/effect/dist/dts/BigDecimal.d';
export type ReceiptResponse = {
    receiptId: string,
    donorName: string,
    donorEmail: string,
    eventName: string,
    amount: BigDecimal,
    message: string,
    date: Date,
    organizationName: string,
    organizationContact: string
}