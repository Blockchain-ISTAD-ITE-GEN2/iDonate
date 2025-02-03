"use client";

import { useState, useEffect } from "react";
import { AverageType, BarchartType } from "@/difinitions/types/chart/barchart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardsMetric } from "./metric";
import { Overview } from "./overview";
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import barchart from "@/data/barchart.json";
import { ReacentTransacctions } from "@/components/organization/dashboard/ReacentTransacctions";

export function BarAndLineChart({ orgUuid }: { orgUuid: string }) {
  const [recentTransactions, setRecentTransactions] = useState<TransactionType[]>([]);
  const [averageData, setAverageData] = useState<AverageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const barchartdata: BarchartType[] = Object.entries(barchart).map(
    ([name, values]) => ({
      name,
      ...values,
    })
  );

  useEffect(() => {
    if (!orgUuid) return;

    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/donation/org-transactions/${orgUuid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();

        console.log("Fetched transactions data:", data);

        // Format transactions
        const formattedTransactions = data.content.map((transaction: any) => ({
          avatar: transaction.avatar || "",
          donor: transaction.username,
          amount: transaction.donationAmount,
          timestamp: transaction.timestamp,
        }));

        setRecentTransactions(formattedTransactions);

        // Compute average donation per day
        const aggregatedData: Record<string, { totalAmount: number; count: number }> = {};
        
        formattedTransactions.forEach((txn: any) => {
          const date = txn.timestamp.split("T")[0]; // Extract YYYY-MM-DD
          if (!aggregatedData[date]) {
            aggregatedData[date] = { totalAmount: 0, count: 0 };
          }
          aggregatedData[date].totalAmount += txn.amount;
          aggregatedData[date].count += 1;
        });

        const computedAverages: AverageType[] = Object.keys(aggregatedData).map((date) => ({
          date,
          amount: aggregatedData[date].totalAmount / aggregatedData[date].count, // Compute average per day
        }));

        setAverageData(computedAverages);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [orgUuid]);

  return (
    <div className="md:w-full grid gap-4 xl:grid-cols-[1fr_480px] grid-cols-1">
      <div className="flex flex-col gap-4">
        {/* ✅ Render CardsMetric with computed average data */}
        <CardsMetric data={averageData} />

      </div>

      {/* Recent Transactions Card */}
      <Card className="md:w-full xl:w-[480px] bg-iDonate-light-gray rounded-lg border border-iDonate-navy-accent dark:bg-iDonate-dark-mode">
        <CardHeader>
          <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
            Recent Transactions
          </CardTitle>

          <CardDescription className="text-sub-description-eng text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
            You received {recentTransactions.length} donations this week.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div>
            {loading && <p>Loading transactions...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && <ReacentTransacctions transactions={recentTransactions} />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
