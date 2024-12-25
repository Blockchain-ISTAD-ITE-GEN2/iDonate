"use client";
import transactions from "@/data/transactions.json";
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import { DonorCardsMetric } from "@/components/donor/transaction-history/metric-donor";

export default function TransactionHistory() {
  const typedTransactions: TransactionType[] = transactions;

  return (
    <div className="md:w-full grid gap-4 lg:grid-cols-[1fr_480px] grid-cols-1">
      <div className="flex flex-col gap-4">
        {/* Cards for metrics */}
        <DonorCardsMetric data={typedTransactions} />
      </div>
    </div>
  );
}
