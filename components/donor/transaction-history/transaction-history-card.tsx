"use client";

import transactions from "@/data/transactions.json";
import { TransactionHistoryCard } from "./transaction-card";
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import { Toolbar } from "@/components/filter/toolbar";
import { useEffect, useState } from "react";

/**
 * Formats transaction data to match the TransactionType structure
 */
const formatTransaction = (t: any): TransactionType => ({
  ...t,
  event: typeof t.event === "string"
    ? { eventName: t.event, orgName: "Unknown Organization" } // Ensuring event matches the type
    : {
        eventName: t.event?.eventName || "Unknown Event",
        orgName: t.event?.orgName || "Unknown Organization",
      }
});

export default function TransactionCardHistory() {
  const typedTransactions: TransactionType[] = transactions.map(formatTransaction);

  const [filteredTransactions, setFilteredTransactions] = useState<TransactionType[]>(typedTransactions);

  useEffect(() => {
    setFilteredTransactions(typedTransactions); // Reset filtered transactions whenever transactions change
  }, [typedTransactions]);

  const filtersFace = [
    {
      key: "event",
      title: "Events",
      options: Array.from(
        new Set(typedTransactions.map((transaction) => transaction.event?.eventName))
      ).map((eventName) => ({
        label: eventName ?? "",
        value: eventName ?? "",
      })),
    },
    {
      key: "amount",
      title: "ចំនួនថវិការបរិច្ចាគ Range",
      options: Array.from(
        new Set(typedTransactions.map((transaction) => transaction.amount))
      ).map((amount) => ({
        label: amount?.toString() ?? "",
        value: amount?.toString() ?? "",
      })),
    },
  ];

  const filtersDateRange = [
    {
      key: "order_date",
      title: "Date Range",
    },
  ];

  return (
    <section className="flex flex-col gap-6">
      <Toolbar
        events={typedTransactions}
        filtersFace={filtersFace}
        searchKey={"event"}
        onFilterChange={setFilteredTransactions}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredTransactions.map((transaction, index) => (
          <TransactionHistoryCard key={index} transaction={transaction} />
        ))}
      </div>
    </section>
  );
}
