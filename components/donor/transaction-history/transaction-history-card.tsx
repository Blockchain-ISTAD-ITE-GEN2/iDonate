"use client";
import transactions from "@/data/transactions.json";
import { TransactionHistoryCard } from "./transaction-card";
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import { Toolbar } from "@/components/filter/toolbar";
import { useEffect, useState } from "react";

export default function TransactionCardHistory() {
  const typedTransactions: TransactionType[] = transactions.map((t) => ({
    ...t,
    event: typeof t.event === "string" ? { name: t.event, media: "", description: "", location: "", startDate: "", endDate: "", type: "", images: [], isDraft: false, isVisible: true } : t.event,
  }));

  const [filteredtransactions, setFilteredtransactions] = useState<
    TransactionType[]
  >(
    transactions.map((t) => ({
      ...t,
      event: typeof t.event === "string" ? { name: t.event, media: "", description: "", location: "", startDate: "", endDate: "", type: "", images: [], isDraft: false, isVisible: true } : t.event,
    })),
  );

  useEffect(() => {
    setFilteredtransactions(typedTransactions); // Reset filtered transactions whenever `transactions` prop changes
  }, [typedTransactions]);

  const filtersFace = [
    {
      key: "event",
      title: "Events",
      options: Array.from(
        new Set(
          typedTransactions.map((transaction) => transaction.event?.name),
        ), // Extract event name
      ).map((eventName) => ({
        label: eventName ?? "",
        value: eventName ?? "",
      })),
    },

    {
      key: "amount",
      title: "Amount Range",
      options: Array.from(
        new Set(typedTransactions.map((transaction) => transaction.amount)),
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
        onFilterChange={setFilteredtransactions}
        // filtersDateRange={filtersDateRange}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredtransactions.map((transaction, index) => (
          <TransactionHistoryCard key={index} transaction={transaction} />
        ))}
      </div>
    </section>
  );
}
