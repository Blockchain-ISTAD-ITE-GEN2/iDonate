"use client";
import transactions from "@/data/transactions.json";
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import { DonorCardsMetric } from "@/components/donor/transaction-history/metric-donor";
import { DonorReacentTransacctions } from "./donor-recent-transaction";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TransactionHistory() {
  const typedTransactions: TransactionType[] = transactions;

  return (
    <div className="flex flex-col xl:flex-row w-full h-full gap-4">
      {/* Cards for metrics */}
      <div className="flex-1">
        <DonorCardsMetric data={typedTransactions} />
      </div>

      {/* Recent Transactions */}
      <Card className="w-full xl:w-[480px] bg-iDonate-light-gray rounded-lg border border-iDonate-navy-accent">
        <CardHeader>
          <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary">
            Recent Transactions
          </CardTitle>

          <CardDescription className="text-sub-description-eng text-iDonate-navy-secondary">
            You have donated 10 times this week.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <DonorReacentTransacctions
            transactions={typedTransactions.slice(0, 4)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
