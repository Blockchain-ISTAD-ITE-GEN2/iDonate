"use client";
import transaction from "@/data/transactions.json";
import { TransactionHistoryCard } from "./transaction-card";
import { TransactionType } from "@/difinitions/types/table-type/transaction";

export default function TransactionHistory() {
  const typedTransactions: TransactionType[] = transaction.slice(0, 4);

  const filtersFace = [
    {
      key: "event",
      title: "Events",
      options: Array.from(
          new Set(typedTransactions.map((transaction) => transaction.event))
      ).map((transaction) => ({
        label: transaction,
        value: transaction,
      })),
    },

    {
      key: "amount",
      title: "Amount Range",
      options: Array.from(
        new Set(typedTransactions.map((transaction) => transaction.amount))
      ).map((amount) => ({
        label: amount.toString(),
        value: amount.toString(),
      })),
    },
  ];

  const filtersDateRange = [
    {
      key: "order_date", // Assuming we are filtering by the event's order_date
      title: "Date Range",
    },
  ];

  return (
    <section lang="km" className="flex flex-col p-9 gap-6">
      <TransactionHistoryCard
        transactions={typedTransactions}
        searchKey="event"
        filtersFace={filtersFace}
        filtersDateRange={filtersDateRange}
      />
    </section>
  );
}
